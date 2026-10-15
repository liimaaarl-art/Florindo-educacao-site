import {Pool} from 'pg';
import {attachDatabasePool} from '@neon/functions';
import {randomBytes,createHash,scryptSync,timingSafeEqual} from 'node:crypto';
import {validate} from './validation.mjs';
const pool=new Pool({connectionString:process.env.DATABASE_URL,max:3,ssl:{rejectUnauthorized:true}});attachDatabasePool(pool);
const hash=v=>createHash('sha256').update(v).digest('hex');
const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET, PUT, POST, OPTIONS','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const response=(body,status=200)=>Response.json(body,{status,headers:cors});
function safePassword(p,encoded){try{const [salt,key]=encoded.split(':');let wanted=Buffer.from(key,'hex'),actual=scryptSync(p,salt,32);return wanted.length===actual.length&&timingSafeEqual(wanted,actual)}catch{return false}}
async function body(req){let text=await req.text();if(text.length>60000)throw Error('Arquivo muito grande.');return JSON.parse(text)}
export default {async fetch(req){
 const path=new URL(req.url).pathname.replace(/\/+$/,'')||'/';
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
 if(path==='/health')return response({ok:true,app:'gabriel-demo',limits:{clients:3,appointments:3,prices:3}});
 try{

  if(path==='/demo/session'&&req.method==='POST'&&process.env.DEMO_OPEN==='true'){
   const token=randomBytes(32).toString('base64url');await pool.query(`INSERT INTO gabriel_sessions(token_hash,role,expires_at) VALUES($1,'admin',now()+interval '12 hours')`,[hash(token)]);return response({token,role:'admin',expiresAt:Date.now()+12*3600000});
  }
  if(path==='/public/availability'&&req.method==='GET'){
   const {rows}=await pool.query('SELECT data FROM gabriel_demo_state WHERE id=1');const d=rows[0].data;
   return response({business:{name:d.settings.name,phone:d.settings.phone,info:d.settings.info},busy:d.appointments.filter(a=>a.status!=='Cancelado').map(a=>({date:a.date,time:a.time,duration:a.duration})),count:d.appointments.length,limit:3,hours:{start:'08:00',end:'20:00',duration:30},timezone:'America/Sao_Paulo'});
  }
  if(path==='/public/book'&&req.method==='POST'){
   const d=await body(req);if(typeof d.name!=='string'||!d.name.trim()||d.name.length>80||typeof d.phone!=='string'||d.phone.length>20||typeof d.service!=='string'||!d.service.trim()||d.service.length>80||typeof d.requestId!=='string'||!/^[a-zA-Z0-9-]{20,80}$/.test(d.requestId))return response({error:'Preencha nome, telefone e atendimento corretamente.'},400);
   let tel=d.phone.replace(/\D/g,'');if((tel.length===12||tel.length===13)&&tel.startsWith('55'))tel=tel.slice(2);if(!/^[1-9]{2}[0-9]{8,9}$/.test(tel))return response({error:'Informe um telefone válido com DDD.'},400);
   const nowParts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).map(x=>[x.type,x.value]));const today=nowParts.year+'-'+nowParts.month+'-'+nowParts.day,nowTime=nowParts.hour+':'+nowParts.minute;const last=new Date(today+'T12:00:00Z');last.setUTCDate(last.getUTCDate()+90);
   if(typeof d.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d.date)||d.date<today||d.date>last.toISOString().slice(0,10)||typeof d.time!=='string'||!/^([01]\d|2[0-3]):(00|30)$/.test(d.time)||d.time<'08:00'||d.time>'19:30'||(d.date===today&&d.time<=nowTime))return response({error:'Escolha um horário futuro entre 8h e 20h, nos próximos 90 dias.'},400);
   const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown',rate=hash('booking:'+ip);const attempts=await pool.query(`INSERT INTO gabriel_login_limits(key,window_start,attempts) VALUES($1,now(),1) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN gabriel_login_limits.window_start<now()-interval '15 minutes' THEN 1 ELSE gabriel_login_limits.attempts+1 END,window_start=CASE WHEN gabriel_login_limits.window_start<now()-interval '15 minutes' THEN now() ELSE gabriel_login_limits.window_start END RETURNING attempts`,[rate]);if(attempts.rows[0].attempts>30)return response({error:'Muitas tentativas. Aguarde alguns minutos.'},429);
   const client=await pool.connect();try{
    await client.query('BEGIN');let {rows}=await client.query('SELECT data FROM gabriel_demo_state WHERE id=1 FOR UPDATE'),next=rows[0].data;const previous=next.appointments.find(a=>a.id===d.requestId);if(previous){await client.query('COMMIT');return response({ok:true,date:previous.date,time:previous.time,id:previous.id})}
    if(next.appointments.length>=3){await client.query('ROLLBACK');return response({error:'A demonstração atingiu o limite de 3 agendamentos. Fale com a barbearia.'},409)}
    let person=next.clients.find(c=>c.phone.replace(/\D/g,'')===tel);if(!person){if(next.clients.length>=3){await client.query('ROLLBACK');return response({error:'A demonstração atingiu o limite de 3 clientes. Fale com a barbearia.'},409)}person={id:randomBytes(16).toString('hex'),name:d.name.trim(),phone:tel};next.clients.push(person)}
    next.appointments.push({id:d.requestId,client:person.id,date:d.date,time:d.time,duration:30,service:d.service.trim(),value:null,status:'Agendado',note:'Agendado pelo cliente na página pública.'});try{validate(next)}catch(e){await client.query('ROLLBACK');return response({error:e.message.includes('sobrepostos')?'Esse horário acabou de ser reservado. Escolha outro.':e.message},409)}
    await client.query('UPDATE gabriel_demo_state SET data=$1::jsonb,revision=revision+1,updated_at=now() WHERE id=1',[JSON.stringify(next)]);await client.query('COMMIT');return response({ok:true,id:d.requestId,date:d.date,time:d.time},201);
   }catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}
  }
  if(path==='/login'&&req.method==='POST'){
   let data=await body(req),name=String(data.username||'').toLowerCase(),password=String(data.password||'');
   if(password.length>200||name.length>60)return response({error:'Credenciais inválidas.'},401);
   const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown',rate=hash('login:'+ip+':'+name);
   const attempts=await pool.query(`INSERT INTO gabriel_login_limits(key,window_start,attempts) VALUES($1,now(),1) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN gabriel_login_limits.window_start<now()-interval '15 minutes' THEN 1 ELSE gabriel_login_limits.attempts+1 END,window_start=CASE WHEN gabriel_login_limits.window_start<now()-interval '15 minutes' THEN now() ELSE gabriel_login_limits.window_start END RETURNING attempts`,[rate]);
   if(attempts.rows[0].attempts>20)return response({error:'Muitas tentativas. Aguarde 15 minutos.'},429);
   let role=name==='gabriel'?'agenda':name==='florindo'?'admin':null;
   const encoded=role==='agenda'?process.env.AGENDA_PASSWORD_HASH:process.env.ADMIN_PASSWORD_HASH;
   if(!role||!safePassword(password,encoded||''))return response({error:'Usuário ou senha incorretos.'},401);
   const token=randomBytes(32).toString('base64url');await pool.query(`INSERT INTO gabriel_sessions(token_hash,role,expires_at) VALUES($1,$2,now()+interval '12 hours')`,[hash(token),role]);
   return response({token,role,expiresAt:Date.now()+12*3600000});
  }
  const token=req.headers.get('authorization')?.replace(/^Bearer /,'');if(!token||token.length>150)return response({error:'Entre para acessar a agenda.'},401);
  const sessions=await pool.query('SELECT role FROM gabriel_sessions WHERE token_hash=$1 AND expires_at>now()',[hash(token)]);const role=sessions.rows[0]?.role;
  if(!role)return response({error:'Sessão encerrada. Entre novamente.'},401);
  if(path==='/logout'&&req.method==='POST'){await pool.query('DELETE FROM gabriel_sessions WHERE token_hash=$1',[hash(token)]);return response({ok:true})}
  if(!['/state','/agenda'].includes(path))return response({error:'Página não encontrada.'},404);
  if(path==='/state'&&role!=='admin')return response({error:'Acesso restrito ao administrador.'},403);
  const project=await pool.query('SELECT data,revision FROM gabriel_demo_state WHERE id=1');let current=project.rows[0];
  if(req.method==='GET')return response({state:path==='/agenda'?{schema:1,clients:current.data.clients,appointments:current.data.appointments,settings:{name:current.data.settings.name,phone:current.data.settings.phone,info:current.data.settings.info}}:current.data,revision:current.revision,role});
  if(req.method==='PUT'){
   let data=await body(req);if(!Number.isInteger(data.revision))return response({error:'Versão dos dados inválida.'},400);
   let next=path==='/agenda'?{...current.data,clients:data.state?.clients,appointments:data.state?.appointments}:data.state;
   try{validate(next)}catch(e){return response({error:e.message},400)}
   const saved=await pool.query('UPDATE gabriel_demo_state SET data=$1::jsonb,revision=revision+1,updated_at=now() WHERE id=1 AND revision=$2 RETURNING revision',[JSON.stringify(next),data.revision]);
   if(!saved.rowCount)return response({error:'A agenda mudou em outro aparelho. Atualize e tente novamente.'},409);
   return response({ok:true,revision:saved.rows[0].revision});
  }
  return response({error:'Operação não disponível.'},405);
 }catch(e){console.error('gabriel-api',e.code||e.name);return response({error:'Não foi possível concluir. Tente novamente.'},500)}
}};

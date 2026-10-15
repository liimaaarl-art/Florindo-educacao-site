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

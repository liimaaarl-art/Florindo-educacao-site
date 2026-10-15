# Gabriel Barbeiro — demonstração aberta

`index.html` é o agendamento público para clientes novos, sem conta. O aplicativo HTML completo é entregue separadamente e abre direto na demonstração, também sem login. Ambos usam os mesmos dados no Neon. Use dados fictícios neste ambiente de teste aberto.

## Agenda pública

`GET /public/availability` retorna apenas horários ocupados, quantidade utilizada e informações públicas da barbearia. Nunca retorna nomes, telefones de clientes, observações, preços ou identificadores de clientes. A grade de teste usa horários de Brasília, das 8h às 20h, com duração de 30 minutos e horizonte de 90 dias.

`POST /public/book` recebe nome, telefone com DDD, atendimento, data, hora e requestId. Cria o cliente quando necessário e reserva o horário numa transação com `SELECT FOR UPDATE`. O requestId permite repetir uma tentativa que perdeu a resposta sem duplicar o agendamento. Conflitos e limites são verificados no servidor.

## Sistema de demonstração

Com `DEMO_OPEN=true`, `POST /demo/session` emite uma sessão temporária de demonstração sem solicitar credenciais. O HTML completo usa essa sessão para `/state`. É uma demonstração aberta, não uma configuração de produção. Rotas antigas com login continuam disponíveis para compatibilidade. Sessões expiram em 12 horas.

Limites compartilhados: 3 clientes, 3 agendamentos e 3 valores. A API valida os dados, e a tabela possui restrições de quantidade. Alterações administrativas usam revisão otimista para não sobrescrever dados de outro aparelho. Atualização entre aparelhos a cada 30 segundos e pelo botão Atualizar.

## Backend

Instale `pg`, `@neon/functions` e `esbuild`. Compile `api.mjs` com import relativo de `validation.mjs` para Node.js 24, formato ESM, restaurando `require` com `createRequire` para o pacote pg. O arquivo no ZIP deve ser `index.mjs`.

Deploy: projeto `odd-thunder-06895093`, branch `br-dry-shadow-b5yi79il`, função `gabrielagenda`, banco exclusivo `gabriel_demo`. `DATABASE_URL` deve apontar para esse banco. Credenciais ficam somente no ambiente do Neon, nunca no repositório ou HTML. Para encerrar o acesso aberto, desative `DEMO_OPEN` e volte ao cliente administrativo autenticado.

O HTML completo tem backup e importação opcional da versão local anterior. WhatsApp permanece com envio manual de mensagens prontas.

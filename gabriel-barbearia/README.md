# Gabriel Barbeiro — demonstração conectada

`index.html` é a página exclusiva da agenda. O aplicativo HTML completo é entregue separadamente. Ambos consultam a mesma API no Neon.

A conta `gabriel` acessa apenas `/agenda`. A conta administrativa acessa `/state`. Senhas não ficam no código: são hashes scrypt definidos no ambiente do Neon. Sessões expiram em 12 horas e são validadas no servidor.

Limites compartilhados: 3 clientes, 3 agendamentos e 3 valores. A API valida os dados e a tabela possui restrições de quantidade. Alterações usam revisão otimista para evitar sobrescrever dados de outro aparelho. Sobreposições de horários são bloqueadas. A página exige acesso da barbearia; não oferece autoagendamento público.

## Backend

Instale `pg`, `@neon/functions` e `esbuild`. O módulo de entrada é `api.mjs`, cujo import relativo usa `validation.mjs`. Compile para Node.js 24, formato ESM, restaurando `require` com `createRequire` para o pacote pg; o arquivo no ZIP deve ser `index.mjs`.

Deploy: Neon project `odd-thunder-06895093`, branch `br-dry-shadow-b5yi79il`, função `gabrielagenda`. O banco desta demonstração é `gabriel_demo`, separado do banco original. Configure `DATABASE_URL` para este banco, `AGENDA_PASSWORD_HASH` e `ADMIN_PASSWORD_HASH` como segredos do ambiente. Nunca salve credenciais no repositório ou no HTML.

O HTML completo tem restauração de backup e importação opcional da versão local anterior. Atualização entre aparelhos a cada 30 segundos, com botão manual. WhatsApp continua com envio manual de mensagens prontas; esta integração não ativa disparos automáticos.

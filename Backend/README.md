# Backend E-good

## Banco de dados

O backend usa SQL Server e o schema existente em `EGOOD.sql`.

1. Abra o arquivo `EGOOD.sql` no SQL Server Management Studio e execute-o para criar o banco `EGood` e suas tabelas.
2. Copie `.env.example` para `.env` e informe os dados reais do SQL Server em `DATABASE_URL`.
3. Instale as dependências e gere o cliente Prisma:

```bash
npm install
npm run prisma:validate
npm run prisma:generate
```

Para conferir se a estrutura existente do banco pode ser lida pelo Prisma, use `npm run prisma:db-pull`.

Depois, inicie a API com `npm run dev`.

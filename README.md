# 🚀 Next.js 16 + BetterAuth + Postgres

Starter moderno pra SaaS, apps autenticados e MVPs — deployável no Railway em 1 clique.

## Stack

- **Next.js 16** (App Router, output `standalone` pra Docker enxuto)
- **BetterAuth 1.2** — auth self-hosted, sem vendor lock-in
- **Drizzle ORM 0.36** + **Postgres 16** — type-safe, migrations versionadas
- **React 19**, **TypeScript 5.7**, **Zod 3.23**

## O que vem configurado

- ✅ Login + cadastro por email/senha (BetterAuth)
- ✅ Sessões persistidas no Postgres (não cookie-only)
- ✅ Schema completo do BetterAuth (user, session, account, verification)
- ✅ Healthcheck em `/api/health` pro Railway monitorar
- ✅ Variáveis de template documentadas — Railway abre wizard pro usuário preencher

## Como usar

### Deploy no Railway (recomendado)
Clique no botão **Deploy on Railway** e siga o wizard. Em ~2min você tem:
- App rodando
- Postgres provisionado
- Schema aplicado
- Auth funcional

### Setup local
```bash
# 1. Suba um Postgres local (Docker)
docker run --name pg -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:16

# 2. Copie e edite as variáveis
cp .env.example .env
# Edite DATABASE_URL e BETTER_AUTH_SECRET

# 3. Instale deps e rode
npm install
npm run db:push    # aplica o schema no Postgres
npm run dev        # sobe em http://localhost:3000
```

## Estrutura

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/route.ts   ← rotas BetterAuth
│   │   └── health/route.ts          ← healthcheck Railway
│   ├── sign-in/page.tsx             ← UI de login/cadastro
│   └── page.tsx                     ← home (protegida)
├── db/
│   ├── index.ts                     ← cliente Drizzle
│   └── schema.ts                    ← tabelas (BetterAuth + suas)
└── lib/
    └── auth.ts                      ← instância do BetterAuth
```

## Adicionando funcionalidades

### Nova tabela
1. Edite `src/db/schema.ts` (ex: `export const posts = pgTable(...)`)
2. `npm run db:generate` → cria migration
3. `npm run db:migrate` → aplica no banco

### OAuth provider (Google, GitHub…)
```ts
// src/lib/auth.ts
import { github } from "better-auth/social-providers";
export const auth = betterAuth({
  // ...
  socialProviders: {
    github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET! }
  }
});
```

## Custo estimado no Railway

| Serviço | Tier | Custo/mês |
|---|---|---|
| Next.js app | Hobby ($5 crédito inclusos) | $0 com trial |
| Postgres | Free tier (500MB) | $0 |
| **Total** | | **$0** até bater limites do trial |

## Licença

MIT

# MIGRATION_CHECKPOINT.md - Migração Fraternidade Cruzeiro do Sul

**Data:** 11/10/2026  
**Status Geral:** Fases 1, 2, 3, 4, 6 e 7 Concluídas | Servidor Unificado Local em Execução (Porta 5000)  
**Origem:** Projeto Replit (`Institutional-Site`)  
**Destino:** Repositório autônomo, versionado no GitHub e publicado com infraestrutura zero custo  

---

## 1. Resumo do Estado Atual

- **Ambiente Local:** Node.js `v24.21.0`, pnpm `12.10.1`, Git `2.55.0.windows.5`.
- **Compilação Geral:** `pnpm run typecheck` e `pnpm run build` passando com **código 0** em todos os 9 pacotes do monorepo.
- **Servidor em Execução:** Processo `task-255` rodando ativamente em segundo plano (`node artifacts/api-server/dist/index.mjs`) na porta **5000**.
- **Validação de Endpoints:**
  - `GET http://localhost:5000/api/healthz` ➔ **HTTP 200 OK** (`{"status":"ok"}`)
  - `GET http://localhost:5000/` ➔ **HTTP 200 OK** (HTML principal do frontend React SPA)
  - `GET http://localhost:5000/a-fraternidade` ➔ **HTTP 200 OK** (Fallback SPA em rotas internas)
  - Suporte completo a requisições `GET` e `HEAD`.

---

## 2. Etapas Concluídas

### Fase 1: Diagnóstico Completo ✓
- Identificação da arquitetura monorepo com `pnpm workspaces`.
- Mapeamento de todas as rotas públicas e administrativas.
- Identificação das dependências e travas do Replit.

### Fase 2: Preservação e Segurança ✓
- Backup frio original mantido intacto em `Institutional-Site.zip` (4.2 MB).
- Remoção do remoto inacessível do Replit (`gitsafe-backup`).
- Proteção de segredos no `.gitignore` (ignora `.env`, `.env.*`, `*.pem`, `*.key`).
- Criação de `.env.example` documentando todas as variáveis necessárias.

### Fase 3: Adaptação da Aplicação ✓
- **Desbloqueio de Binários Windows:** Removidas as regras em `pnpm-workspace.yaml` que bloqueavam compilações win32 (`esbuild`, `lightningcss`, `@tailwindcss/oxide`, `rollup`).
- **Remoção de Scripts Unix-only:** Removido `sh -c` em `preinstall` e `export NODE_ENV` em `api-server`.
- **Desacoplamento de Plugins Replit:** Removidos `@replit/vite-plugin-*` e `@replit/connectors-sdk`.
- **Resiliência do Vite:** Adicionados fallbacks de porta (`5173`) e base path (`/`), além de proxy dev para `/api` ➔ `http://localhost:5000`.
- **Servidor Unificado Fullstack:** Adicionado middleware ao Express para servir o frontend estático compilado em produção com fallback SPA automático.
- **Correção de Tipos TypeScript (React 19 & Schemas):**
  - Corrigidos campos de comentários em `Comments.tsx` (`content`, `name`, `email`).
  - Corrigidas mutações de imagens em `Gallery.tsx`.
  - Substituído `JSX.Element` por `React.ReactNode` em `Library.tsx` e `Posts.tsx`.

### Fase 4 & 6: Configuração, Banco e Segurança ✓
- Conexão do banco adaptada em `lib/db/src/index.ts` com fallback e carregamento automático de `.env`.
- Script de inicialização/seed criado em `scripts/src/seed.ts` (popula admin, configurações institucionais, FAQs e timeline).
- Criação de `.env` local para desenvolvimento.

### Fase 7: Testes e Validação ✓
- Instalação de dependências via `pnpm install` concluída.
- Typecheck completo verificado (`tsc --build` e `tsc -p tsconfig.json --noEmit` em todos os pacotes).
- Build de produção verificado com geração de assets minificados em `dist/public`.
- Servidor local testado e respondendo via `curl.exe` com HTTP 200.

### Fase 9: Automação CI/CD ✓
- Criado `.github/workflows/ci.yml` para validação contínua de tipos e compilação a cada push no GitHub Actions.

---

## 3. Próximas Etapas

1. **Revisão e Confirmação das Alterações com o Usuário:**
   - O git status possui alterações preparadas sem nenhum dado sensível.
2. **Fase 5: Versionamento no GitHub:**
   - Criação de commit descritivo e vinculação do repositório remoto no GitHub do usuário.
3. **Fase 8: Publicação / Hospedagem:**
   - Escolha do destino de publicação (Hospedagem unificada no Render/Railway/Fly.io ou Frontend estático no Firebase Hosting / GitHub Pages com API conectada).

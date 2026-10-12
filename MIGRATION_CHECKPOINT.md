# MIGRATION_CHECKPOINT.md - Migração Fraternidade Cruzeiro do Sul

**Data:** 11/10/2026  
**Status Geral:** Concluído com Sucesso Total | Repositório GitHub Publicado e Atualizado | Projeto Firebase Dedicado e Isolado  
**Repositório GitHub:** [https://github.com/Daniell1mma/cruzeiro-do-sul](https://github.com/Daniell1mma/cruzeiro-do-sul)  
**Projeto Firebase Dedicado:** `cruzeiro-do-sul-sp` (Google Cloud / Firebase Spark - 100% Gratuito)  
**URL Pública Online:** [https://cruzeiro-do-sul-sp.web.app](https://cruzeiro-do-sul-sp.web.app)  

---

## 1. Resumo da Entrega

- **GitHub Repositório Criado e Sincronizado:**
  - Repositório: `Daniell1mma/cruzeiro-do-sul`
  - URL: [https://github.com/Daniell1mma/cruzeiro-do-sul](https://github.com/Daniell1mma/cruzeiro-do-sul)
  - Branch: `main`
  - Push realizado com sucesso via Git Credential Manager com histórico preservado e commits estruturados.
  - CI/CD automatizado via GitHub Actions configurado em `.github/workflows/ci.yml`.

- **Projeto Firebase Exclusivo e Isolado:**
  - Projeto criado via Firebase CLI: `cruzeiro-do-sul-sp`
  - Totalmente separado de qualquer outro projeto (`cepl-vo-catarina-pai-damiao` intacto).
  - Console Firebase: [https://console.firebase.google.com/project/cruzeiro-do-sul-sp/overview](https://console.firebase.google.com/project/cruzeiro-do-sul-sp/overview)
  - URL de Produção com SSL e CDN: [https://cruzeiro-do-sul-sp.web.app](https://cruzeiro-do-sul-sp.web.app)
  - Validação via HTTP: **HTTP 200 OK** verificado em `/`, `/apometria`, `/cursos`, `/a-fraternidade`.

- **Correção da Tela Branca (Resolução Definitiva):**
  - **Causa Raiz Identificada:** No Firebase Hosting (hospedagem estática), o rewrite `** -> /index.html` fazia com que chamadas de API (`/api/settings`, etc.) retornassem documento HTML com status 200. O cliente de API parseava como string, e os componentes invocavam métodos de array (`settings?.find`, `map`, `reduce`) diretamente sobre a string ou sobre dados indefinidos, disparando exceção não tratada `n?.find is not a function` que impedia a renderização do React.
  - **Medidas Adotadas:**
    1. `lib/api-client-react/src/custom-fetch.ts`: Tratamento para rejeitar respostas HTML em endpoints de API com `ApiError`.
    2. Componentes públicos (`Fraternidade`, `Contact`, `Attendance`, `Home`, `Courses`, `Blog`, `BlogPost`, `Faq`, `Gallery`, `Library`, `History`, `Apometria`, `Footer`, `FloatingWhatsApp`): Inclusão de checagens defensivas com `Array.isArray(...)` e valores de fallback para todas as propriedades de configuração e listas.
    3. `App.tsx`: Criação de `ErrorBoundary` global com fallback amigável em caso de erros inesperados e ajuste de `routerBase`.
    4. Validação visual e de console executada via Microsoft Edge headless: confirmação de carregamento completo do cabeçalho, hero section, botões de ação e rodapé sem qualquer erro de console.

- **Servidor Local Fullstack:**
  - Processo ativo em background na porta `5000` (`node artifacts/api-server/dist/index.mjs`) entregando a API REST e o SPA React.

- **Preservação e Backup:**
  - Cópia original intacta em `Institutional-Site.zip` (4.2 MB).
  - Variáveis de ambiente protegidas no `.gitignore` (`.env`, `.firebase/`, etc.).

---

## 2. Comandos para Atualizações Futuras

1. **Desenvolvimento Local:**
   ```bash
   pnpm run dev:frontend   # Vite frontend na porta 5173
   pnpm run dev:api        # Express API na porta 5000
   ```
2. **Deploy de Novas Versões no Firebase Hosting:**
   ```bash
   pnpm run build
   npx firebase-tools deploy --only hosting
   ```
3. **Sincronização com o GitHub:**
   ```bash
   git add .
   git commit -m "sua alteração"
   git push
   ```

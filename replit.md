# Fraternidade Cruzeiro do Sul

Site institucional moderno para a Fraternidade Cruzeiro do Sul, localizada em Guarulhos/SP — um centro espiritual dedicado à prática e ao ensino da Apometria.

## Run & Operate

- `pnpm --filter @workspace/cruzeiro-do-sul run dev` — run the frontend (port assigned by artifact)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion + Wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/cruzeiro-do-sul/` — React frontend (public site + admin panel)
- `artifacts/api-server/src/routes/` — API route handlers (posts, courses, library, gallery, timeline, testimonials, comments, faq, settings, dashboard)
- `lib/db/src/schema/` — Drizzle table definitions (posts, courses, library, gallery, timeline, testimonials, comments, faq, settings)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all API contracts)
- `lib/api-client-react/` — Generated React Query hooks
- `lib/api-zod/` — Generated Zod validation schemas

## Site Structure

**Public pages:** / (Home), /quem-somos, /nossa-historia, /apometria, /cursos, /biblioteca, /blog, /blog/:slug, /galeria, /atendimento, /faq, /contato

**Admin panel:** /admin/dashboard, /admin/posts, /admin/courses, /admin/library, /admin/gallery, /admin/timeline, /admin/testimonials, /admin/comments, /admin/faq, /admin/settings

## Architecture decisions

- Headless CMS pattern: all site content (including site settings like WhatsApp, address, Google Forms URL) is stored in the DB and editable via admin panel — no code changes needed for content updates.
- Site settings use a key-value table (`site_settings`) for maximum flexibility.
- Comments and testimonials require admin approval before appearing publicly.
- All integer fields in OpenAPI spec use `type: number` (not `type: integer`) to avoid `zod.int()` generation incompatibility with zod v3.

## Product

- Institutional website for a Brazilian spiritual fraternity practicing Apometria
- Dual audience: people seeking spiritual care + people wanting to study Apometria
- Main CTA: "Solicitar Atendimento" — directs to Google Forms (configurable via admin)
- Admin panel allows non-technical staff to manage all content without code changes

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- OpenAPI integer fields must use `type: number` not `type: integer` — Orval generates `zod.int()` for integer types which doesn't exist in zod v3
- The `featured` flag on posts and courses controls what appears in home page sections
- Comments default to `approved: false`; testimonials default to `approved: false`
- Gallery image deletion cascades (album delete → all images deleted)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

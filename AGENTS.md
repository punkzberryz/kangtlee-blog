# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js (App Router) codebase with the core app in `src/app`. Route groups live under folders like `src/app/(main)` and `src/app/admin`, and page/route handlers sit next to their UI. Shared UI lives in `src/components`, reusable logic in `src/lib`, and global styles in `src/styles`. Static assets (images, icons, etc.) go in `public`. Prisma schema is defined in `prisma/schema.prisma`.

## Build, Test, and Development Commands
- `pnpm dev`: start the Next.js dev server with Turbopack.
- `pnpm build`: build the production app.
- `pnpm start`: serve the production build.
- `pnpm lint`: run ESLint across the repo.
- `make up` / `make down`: start/stop local Docker services (`docker-compose.dev.yml`).
- `make logs`: tail container logs for the app.

## Coding Style & Naming Conventions
Use TypeScript/React with 2-space indentation and double quotes (matching existing files). Tailwind CSS is the styling system; keep class lists formatted with `prettier` + `prettier-plugin-tailwindcss`. Component files are typically kebab-case (`google-adsense-provider.tsx`), while React components and exports are PascalCase. Route segments in `src/app` use lowercase/kebab-case.

## Testing Guidelines
No dedicated test runner or `test` script is configured. For now, rely on `pnpm lint` and `pnpm build` for basic validation. If you add tests, place them in `__tests__` or next to the module under test and document the runner you introduce.

## Commit & Pull Request Guidelines
Recent commits use short, lowercase, imperative subjects (e.g., “add debug”, “update lockfile”). Keep messages concise and action-oriented. PRs should include a clear description, any linked issues, and screenshots or short clips for UI changes. Note required env/config updates when applicable and confirm `pnpm lint`/`pnpm build` results.

## Configuration & Secrets
Environment variables are read in `src/lib/config.ts` and auth/email modules (e.g., OAuth client IDs/secrets, mailer credentials). Use `.env.local` for local development and avoid committing secrets.

Required env vars (see `src/lib/config.ts`):
- `NEXT_PUBLIC_URL` (base site URL for metadata/canonical links).
- `SIGNUP_ADMIN_SECRET` (admin signup gating).
- `CLOUDINARY_API_SECRET`, `CLOUDINARY_API_KEY`, `NEXT_PUBLIC_CLOUDINARY_NAME` (image upload/config).
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (analytics; optional in dev).

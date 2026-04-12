# Botforge

Botforge is the web dashboard for building and operating Facebook Messenger automation flows, community marketplace content, and support chat—aimed at teams and creators who manage bots and customer conversations from the browser.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-private-lightgrey)](https://github.com/BotforgeProject/botforge-fe)
[![Vercel](https://img.shields.io/badge/Vercel-not%20connected-lightgrey?logo=vercel)](https://vercel.com)

**Backend API:** [https://github.com/lethanhdat-swe/botforge-api](https://github.com/lethanhdat-swe/botforge-api)

## Table of contents

- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Key pages and routes](#key-pages-and-routes)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)

## Prerequisites

| Requirement  | Notes                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js      | **20.x** (aligned with `devDependencies.@types/node` and Next.js 16); no `engines` or `.nvmrc` is committed—use 20 LTS locally.                                |
| Backend API  | **Botforge-BE** must be running and reachable at the origin implied by `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_BE_URL` (defaults target `http://localhost:8000`). |
| Global tools | None; install dependencies with **npm** and run scripts from `package.json`.                                                                                   |

## Quick start

```bash
git clone https://github.com/BotforgeProject/botforge-fe.git
cd botforge-fe
npm install
```

```bash
cp .env.example .env.local
```

Edit **`.env.local`**: set **`NEXT_PUBLIC_API_URL`**, **`NEXT_PUBLIC_BE_URL`**, and **`NEXT_PUBLIC_BASE_URL`** to match your local or deployed URLs (no trailing slash on API paths beyond what your backend expects—defaults use `/api` on port 8000). Add all **Firebase** and **Facebook** keys from [Environment variables](#environment-variables) before you exercise Google or Facebook login.

Start **Botforge-BE** (see the backend README), then:

```bash
npm run dev
```

The dev script runs **`next dev --experimental-https`**, so open **`https://localhost:3000`** (port **3000** unless Next prints a different URL). Your browser may warn about the local certificate—accept the risk for local development.

When setup succeeds, you see the **BotForge** marketing home (Vietnamese metadata title **“BotForge – Nền tảng Tạo Chatbot Miễn phí”**), public header and footer, and no console errors from failed API calls on first paint.

## Environment variables

### API

| Variable               | Required | Description                                                                                                                                                                                      | Example                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `NEXT_PUBLIC_API_URL`  | No\*     | Base URL for REST calls including the `/api` prefix the backend mounts. ⚠️ Wrong host, port, or missing `/api` breaks every axios/fetch to the API while the UI may still render.                | `http://localhost:8000/api` |
| `NEXT_PUBLIC_BE_URL`   | No\*     | Origin of the backend without the `/api` path (used for uploads, absolute media URLs, and Socket.io base). ⚠️ Must match the same host/port as the API origin or assets and realtime calls fail. | `http://localhost:8000`     |
| `NEXT_PUBLIC_BASE_URL` | No\*     | Public origin of this Next app (links and client-side assumptions). ⚠️ Mismatch with how users open the site can break OAuth return URLs or absolute links.                                      | `http://localhost:3000`     |

\*Defaults are baked into `src/config/envConfig.ts` for local development; production and Vercel should set all three explicitly.

### Auth

| Variable                           | Required                                | Description                                                                                                                                                                                          | Example                  |
| ---------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_FACEBOOK_APP_ID`      | For Facebook login / Messenger features | Meta app ID consumed by the Facebook login component. ⚠️ Empty value disables or breaks client-side Facebook flows.                                                                                  | `1234567890123456`       |
| `NEXT_PUBLIC_FIREBASE_API_KEY`     | Yes†                                    | Firebase Web API key. ⚠️ `getClientAuth()` throws if `apiKey` or `projectId` is missing when Firebase auth runs.                                                                                     | `AIzaSy...`              |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Yes†                                    | Firebase auth domain (`project-id.firebaseapp.com`). ⚠️ Wrong domain causes silent auth failures or invalid issuer errors.                                                                           | `my-app.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`  | Yes†                                    | Firebase project ID. ⚠️ Must match the project that issued users you expect to sign in.                                                                                                              | `my-app`                 |
| `NEXT_PUBLIC_FIREBASE_APP_ID`      | Yes†                                    | Firebase app ID from the Firebase console.                                                                                                                                                           | `1:123:web:abc`          |
| `NODE_ENV`                         | Automatic                               | Set by Next.js (`development` / `production`); controls `secure` on auth cookies in `src/app/api/auth/*`. ⚠️ Do not rely on manual overrides unless you understand cookie behavior on HTTP vs HTTPS. | `development`            |

†Required before calling `getClientAuth()` from `src/config/firebaseClient.ts` (Google sign-in and related flows).

### Feature flags

| Variable | Required | Description                                                                                              | Example |
| -------- | -------- | -------------------------------------------------------------------------------------------------------- | ------- |
| —        | —        | No feature-flag environment variables are read in `src/`; toggles are not env-driven in this repository. | —       |

## Project structure

```text
botforge-fe/
├── certificates/          Local TLS material used with Next.js experimental HTTPS (if present in your clone).
├── docs/                  Supplementary documentation assets for the product or team.
├── public/                Static files served from `/` (favicons, images, etc.).
├── src/
│   ├── app/               Next.js App Router: layouts, pages, and route handlers under `src/app`.
│   ├── assets/            Imported images and static media used by components.
│   ├── components/        Shared UI (Radix, canvas, editors, shell widgets).
│   ├── config/            Client env mapping and Firebase initialization helpers.
│   ├── constants/         App-wide constant values and labels.
│   ├── hooks/             Reusable React hooks (tables, media queries, etc.).
│   ├── http/              Shared fetch/axios setup for the backend API.
│   ├── layouts/           Route-group layout chrome (public, private, admin, drag-drop builder).
│   ├── lib/               Generic utilities and class-name helpers.
│   ├── services/          API service modules per domain (auth, flows, admin, etc.).
│   ├── socket/            Socket.io client wiring for realtime features.
│   ├── store/             Zustand stores (auth persistence and UI state).
│   ├── styles/            Global styles complementing Tailwind.
│   ├── types/             Shared TypeScript types.
│   └── validation/        Zod schemas and form validation helpers.
├── components.json        shadcn/ui component configuration.
├── eslint.config.mjs      ESLint flat config for the app.
├── next.config.ts         Next.js configuration (images, `reactStrictMode`).
├── package.json           Dependencies and npm scripts.
├── postcss.config.mjs     PostCSS pipeline for Tailwind v4.
└── tsconfig.json          TypeScript compiler options and path aliases.
```

## Key pages and routes

| Path                                  | Component                                  | Auth required                   | Description                                 |
| ------------------------------------- | ------------------------------------------ | ------------------------------- | ------------------------------------------- |
| `/`                                   | `(public)/(home)/page`                     | No                              | Marketing landing page.                     |
| `/about`                              | `(public)/about/page`                      | No                              | About content.                              |
| `/contact`                            | `(public)/contact/page`                    | No                              | Contact page.                               |
| `/marketplace`                        | `(public)/marketplace/page`                | No                              | Public marketplace listing.                 |
| `/marketplace/[id]`                   | `(single-header)/marketplace/[id]/page`    | No                              | Marketplace flow detail.                    |
| `/blogs`                              | `(single-header)/blogs/page`               | No                              | Blog index.                                 |
| `/blogs/[id]`                         | `(single-header)/blogs/[id]/page`          | No                              | Blog article.                               |
| `/guides/[slug]`                      | `(single-header)/guides/[slug]/page`       | No                              | Guide article by slug.                      |
| `/login`                              | `(auth)/login/page`                        | No                              | Email/password and social sign-in.          |
| `/register`                           | `(auth)/register/page`                     | No                              | Registration.                               |
| `/forgot-password`                    | `(auth)/forgot-password/page`              | No                              | Password reset request.                     |
| `/reset-password`                     | `(auth)/reset-password/page`               | No                              | Password reset completion.                  |
| `/verify-email`                       | `(auth)/verify-email/page`                 | No                              | Email verification handler.                 |
| `/logout`                             | `(auth)/logout/page`                       | No                              | Logout flow page.                           |
| `/auth-logout`                        | `(auth)/auth-logout/page`                  | No                              | Alternate logout completion.                |
| `/auth-session-sync`                  | `(auth)/auth-session-sync/page`            | No                              | Session synchronization helper.             |
| `/dashboard`                          | `(private)/dashboard/page`                 | Signed-in user (client session) | User dashboard and charts.                  |
| `/chat`                               | `(private)/chat/page`                      | Signed-in user                  | User chat workspace.                        |
| `/notifications`                      | `(private)/notifications/page`             | Signed-in user                  | Notification center.                        |
| `/profile`                            | `(private)/profile/page`                   | Signed-in user                  | User profile.                               |
| `/data/pages`                         | `(private)/data/pages/page`                | Signed-in user                  | Connected Facebook pages list/management.   |
| `/data/templates`                     | `(private)/data/templates/page`            | Signed-in user                  | Template management.                        |
| `/data/analytics`                     | `(private)/data/analytics/page`            | Signed-in user                  | Analytics views.                            |
| `/bot/settings`                       | `(private)/bot/settings/page`              | Signed-in user                  | Bot settings.                               |
| `/bot/flows`                          | `(dragdrop)/bot/flows/page`                | Signed-in user                  | Visual flow builder (React Flow canvas).    |
| `/community/store`                    | `(private)/community/store/page`           | Signed-in user                  | Community store listing.                    |
| `/community/store/new`                | `(private)/community/store/new/page`       | Signed-in user                  | Create shared flow listing.                 |
| `/community/store/[id]/edit`          | `(private)/community/store/[id]/edit/page` | Signed-in user                  | Edit shared flow listing.                   |
| `/community/saved`                    | `(private)/community/saved/page`           | Signed-in user                  | Saved community items.                      |
| `/support/chat`                       | `(private)/support/chat/page`              | Signed-in user                  | User support chat.                          |
| `/admin/dashboard`                    | `admin/dashboard/page`                     | Signed-in admin (API-enforced)  | Admin metrics dashboard.                    |
| `/admin/users`                        | `admin/users/page`                         | Signed-in admin                 | User administration.                        |
| `/admin/flow-shares`                  | `admin/flow-shares/page`                   | Signed-in admin                 | Moderate shared flows.                      |
| `/admin/flow-share-categories`        | `admin/flow-share-categories/page`         | Signed-in admin                 | Flow share categories list.                 |
| `/admin/flow-share-categories/create` | `admin/flow-share-categories/create/page`  | Signed-in admin                 | Create category.                            |
| `/admin/flow-share-categories/[slug]` | `admin/flow-share-categories/[slug]/page`  | Signed-in admin                 | Edit category by slug.                      |
| `/admin/blogs`                        | `admin/blogs/page`                         | Signed-in admin                 | Blog posts admin list.                      |
| `/admin/blogs/create`                 | `admin/blogs/create/page`                  | Signed-in admin                 | Create blog post.                           |
| `/admin/blogs/[id]`                   | `admin/blogs/[id]/page`                    | Signed-in admin                 | Edit blog post.                             |
| `/admin/blog-category`                | `admin/blog-category/page`                 | Signed-in admin                 | Blog categories list.                       |
| `/admin/blog-category/create`         | `admin/blog-category/create/page`          | Signed-in admin                 | Create blog category.                       |
| `/admin/blog-category/[id]`           | `admin/blog-category/[id]/page`            | Signed-in admin                 | Edit blog category.                         |
| `/admin/guides`                       | `admin/guides/page`                        | Signed-in admin                 | Guides management.                          |
| `/admin/support/chat`                 | `admin/support/chat/page`                  | Signed-in admin                 | Admin support inbox.                        |
| `/simple`                             | `simple/page`                              | No                              | Minimal demo or debug page.                 |
| `/api/auth`                           | `api/auth/route` handler                   | —                               | Sets HTTP-only session cookies for auth.    |
| `/api/auth/logout`                    | `api/auth/logout/route` handler            | —                               | Clears auth cookies.                        |
| `/api/auth/slice-session`             | `api/auth/slice-session/route` handler     | —                               | Refreshes short-lived access token cookies. |

There is **no** root `middleware.ts`; route groups organize UI, and the backend enforces **Bearer** tokens for protected APIs. Treat **Signed-in user** as “valid tokens in `authStore` and cookies”; treat **Admin** as “user with `admin` role returned from the API.”

## Scripts

| Script  | Command                         | When to use                                               |
| ------- | ------------------------------- | --------------------------------------------------------- |
| `dev`   | `next dev --experimental-https` | Local development with hot reload and HTTPS.              |
| `build` | `next build`                    | Production compile and static optimization before deploy. |
| `start` | `next start`                    | Serve the production build locally or on a host.          |
| `lint`  | `eslint`                        | Run ESLint over the project (CI or pre-commit).           |

## Troubleshooting

| Problem                        | What to check                                                                                                                                                                                                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API not reachable              | Confirm **Botforge-BE** is running. Verify **`NEXT_PUBLIC_API_URL`** points at the backend’s `/api` base (default `http://localhost:8000/api`). Typos or wrong ports produce network errors in the browser while pages may still load.                                      |
| Auth fails                     | Ensure every **`NEXT_PUBLIC_FIREBASE_*`** value matches the Firebase Web app in the console. Missing **`NEXT_PUBLIC_FACEBOOK_APP_ID`** breaks the Facebook login button. Confirm the backend accepts tokens from the same Firebase project.                                 |
| Hydration errors on first load | Root layout sets **`suppressHydrationWarning`** on `<html>` for theme switching; if new warnings appear, compare server vs client-only modules (dynamic import or `"use client"`). Third-party widgets (e.g. chat) should render only after mount when they touch `window`. |
| Build fails on Vercel          | Mirror **all** `NEXT_PUBLIC_*` variables from `.env.local` into the Vercel project settings; they are inlined at build time. Missing Firebase or API URLs often fails pages that import `envConfig` or initialize auth at module scope.                                     |
| CORS errors                    | The backend allowlists **`FRONTEND_URL`** (see Botforge-BE README). Your deployed **`NEXT_PUBLIC_BASE_URL`** / browser origin must match that value in production, or the API rejects browser requests with CORS errors.                                                    |

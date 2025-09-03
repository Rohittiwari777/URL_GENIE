# URL Genie

Summon short, shareable links with a touch of magic. URL Genie is a modern URL shortener built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui, backed by Supabase.

## Features

- Shorten any valid URL into a friendly code (e.g. /Ab12Xy)
- Redirect handler at `/:code` resolves to the original URL
- Persists links in Supabase with fields: `id`, `created_at`, `original_url`, `short_url`
- Recent links list and copy-to-clipboard
- Clean, responsive UI with a subtle Arabian theme

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn-ui components
- Supabase (Postgres + JS client)

## Prerequisites

- Node.js 18+ and npm
- Supabase project with a table named `urls`:

```sql
create table if not exists public.urls (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  original_url text not null,
  short_url text not null
);
create index if not exists urls_short_url_idx on public.urls (short_url);
```

## Environment Variables

Create a `.env` file in the project root (Vite uses `VITE_*` vars):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

```sh
npm install
npm run dev
```

Open the dev server URL printed in your terminal (typically http://localhost:5173).

## How It Works

- When you shorten a link, the app generates a short code and saves a row to `public.urls` with `original_url` and `short_url` (stored as `${window.location.origin}/${code}`).
- Visiting `/:code` triggers the redirect route, which looks up `short_url` in Supabase and redirects to `original_url`.

## Configuration Notes

- If you deploy under a different domain, ensure newly created `short_url` values are stored with that origin, or update the redirect query to match your stored format.
- SPA routing: configure your host (e.g., Vercel, Netlify, Cloudflare Pages, static hosting) to redirect all paths to `index.html` so dynamic routes like `/:code` work on refresh.

## Build & Deploy

```sh
npm run build
npm run preview # optional: preview the production build locally
```

Deploy the contents of `dist/` to any static hosting provider. Remember to set the environment variables at build/runtime if your host inlines them.

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run preview` – preview the build locally

## Project Structure

- `src/pages/Index.tsx` – main UI (branding, form, recent links)
- `src/pages/Redirect.tsx` – dynamic redirect route `/:code`
- `src/components/UrlShortenerForm.tsx` – form to shorten URLs
- `src/components/RecentUrlsList.tsx` – list of recent shortened links
- `src/components/ShortenedUrlCard.tsx` – card displaying a single shortened link
- `src/db/supabase.js` – Supabase client
- `src/db/urlRepository.ts` – data access for `urls` table

## License

MIT

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0d607fbe-b75b-49ca-8a7d-97cbb0378f14

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0d607fbe-b75b-49ca-8a7d-97cbb0378f14) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0d607fbe-b75b-49ca-8a7d-97cbb0378f14) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

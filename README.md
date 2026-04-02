# Portfolio

A world-class personal portfolio built with Next.js 15, Tailwind CSS v4, Framer Motion v11, and React Three Fiber. Designed for Vercel deployment.

---

## Tech stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Framer Motion v11 |
| Smooth scroll | Lenis v1 |
| 3D visuals | React Three Fiber + Drei |
| Icons | Lucide React |
| Email | Resend |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| Package manager | pnpm |

---

## Getting started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and configure each variable (see the [Environment variables](#environment-variables) section below for full details).

### 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server uses Turbopack for fast refresh.

### 4. Build for production

```bash
pnpm build
pnpm start
```

---

## Environment variables

All variables live in `.env.local` (never commit this file). A documented template is provided in `.env.local.example`.

### `RESEND_API_KEY`

**Required for the contact form to send emails.**

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** → **Create API Key**
3. Paste it here

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

Without this key the contact form will still render correctly and validate, but submissions will return a 500 error. The dev server will still run fine without it.

---

### `CONTACT_TO_EMAIL`

**The inbox that receives contact form submissions.**

This is your personal email — wherever you want leads and enquiries to land.

```
CONTACT_TO_EMAIL=you@yourdomain.com
```

---

### `CONTACT_FROM_EMAIL`

**The "From" address shown in the email you receive.**

This must be an address on a domain you have verified with Resend. Resend requires domain verification before you can send from a custom address.

Steps to verify a domain:
1. Log into Resend → **Domains** → **Add Domain**
2. Add the DNS records Resend gives you to your domain registrar (Cloudflare, Namecheap, etc.)
3. Once verified, you can use any address on that domain here

```
CONTACT_FROM_EMAIL=contact@yourdomain.com
```

> **Note:** If you just want to test quickly without verifying a domain, Resend provides a shared sandbox address you can use while in development. Check your Resend dashboard for the current sandbox address.

---

### Full `.env.local` example

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=contact@yourdomain.com
```

---

### How env vars work — local vs Vercel

**Never hardcode these values in the source code.** Here is how the split works:

| Environment | Where the values live |
|---|---|
| Local dev | `.env.local` on your machine |
| Vercel (production / preview) | Vercel dashboard → Settings → Environment Variables |

`.env.local` is excluded from git by Next.js's default `.gitignore`, so it will never be pushed to GitHub. The `.env.local.example` file in the repo is just a template with placeholder values — it is safe to commit because it contains no real secrets.

When you deploy, Vercel injects the dashboard values into the serverless functions at build and runtime. Your code reads `process.env.RESEND_API_KEY` the same way in both environments — nothing needs to change between local and production.

#### Adding vars to Vercel

**Before the first deploy** — on the import screen, scroll to **Environment Variables** and add them there before clicking Deploy.

**On an already-deployed project:**

1. Vercel dashboard → your project → **Settings → Environment Variables**
2. Add each variable and tick **Production**, **Preview**, and **Development**
3. After saving, go to **Deployments** → latest deployment → **⋯** → **Redeploy**

The redeploy step is required because env vars are baked in at build time — saving them in the dashboard alone does not apply them to an existing deployment.

---

## Personalizing the content

All content is hardcoded in the component files — no CMS or database needed. Find and replace the placeholder values below.

### Your name & metadata

`app/layout.tsx` — update the `metadata` object:

```ts
title: "Your Name — Designer & Developer",
description: "...",
openGraph: {
  url: "https://yourname.dev",
  ...
},
twitter: {
  creator: "@yourhandle",
},
```

### Navigation logo

`components/navigation/Navbar.tsx` — change the `YN.` initials:

```tsx
YN<span style={{ color: "var(--color-accent)" }}>.</span>
```

### Hero section

`components/sections/Hero.tsx` — update the headline words array and tagline:

```tsx
const headline = ["Crafting", "digital", "experiences", "that", "matter."];
// second word gets the accent color — adjust index as needed
```

### About section

`components/sections/About.tsx` — update:
- `bioLines[]` — your bio, one sentence fragment per line
- `stats[]` — years, projects, clients, satisfaction
- Replace the placeholder image div with `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/your-photo.jpg"   // place in /public
  alt="Your Name"
  fill
  style={{ objectFit: "cover" }}
  priority
/>
```

Place your photo in the `/public` folder.

### Projects section

`components/sections/Projects.tsx` — edit the `projects[]` array. Each project takes:

```ts
{
  id: number,
  title: string,
  category: string,      // e.g. "SaaS / Finance"
  year: string,
  description: string,
  accent: string,        // hex color — drives card glow + tag colors
  tags: string[],
  bg: string,            // CSS gradient for card background
}
```

Add or remove objects to change the number of cards.

### Skills / Bento grid

`components/sections/Skills.tsx` — edit the `cards[]` array. Each card:

```ts
{
  icon: <LucideIcon size={28} />,
  title: string,
  description: string,
  span: "normal" | "wide" | "tall",   // controls grid footprint
  accent: string,                      // icon background tint + icon color
}
```

### Experience timeline

`components/sections/Experience.tsx` — edit the `experiences[]` array:

```ts
{
  company: string,
  role: string,
  period: string,        // e.g. "2022 — Present"
  location: string,
  bullets: string[],     // 2–3 achievement bullets
  accent: string,        // hex color for this card's accents
}
```

Cards alternate left/right automatically based on index.

### Testimonials

`components/sections/Testimonials.tsx` — edit the `testimonials[]` array:

```ts
{
  quote: string,
  name: string,
  title: string,
  company: string,
  initial: string,   // 2-letter avatar, e.g. "SC"
}
```

Auto-advance interval is controlled by the `INTERVAL` constant (default `5500` ms).

### Contact section

`components/sections/Contact.tsx` — update:

```tsx
const EMAIL = "hello@yourname.dev";   // shown in the "click to copy" button

const socials = [
  { icon: <Github size={20} />, label: "GitHub",   href: "https://github.com/yourhandle" },
  { icon: <Twitter size={20} />, label: "Twitter",  href: "https://twitter.com/yourhandle" },
  { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
];
```

### Footer

`components/sections/Footer.tsx` — update the copyright name:

```tsx
© {new Date().getFullYear()} Your Name. All rights reserved.
```

---

## Theming

The entire design token set lives in `app/globals.css` inside the `@theme {}` block (Tailwind CSS v4 syntax):

```css
@theme {
  --color-bg: #080808;          /* page background */
  --color-bg-soft: #0f0f0f;
  --color-bg-card: #111111;
  --color-fg: #f0eee8;          /* primary text */
  --color-fg-muted: #8a8880;    /* secondary text */
  --color-accent: #ccff00;      /* acid lime — change this to rebrand */
  --color-border: rgba(240, 238, 232, 0.08);
}
```

To switch accent color (e.g. to electric indigo `#6366f1`), change `--color-accent` and the corresponding `rgba` in `--color-accent-dim`.

---

## Deploying to Vercel

This project is pre-configured for Vercel via `vercel.json` at the repo root. No build settings need to be touched in the dashboard — Vercel reads everything from that file.

---

### Step 1 — Push to GitHub

If you haven't already, initialise a remote repo and push:

```bash
git add .
git commit -m "initial commit"
git remote add origin https://github.com/your-username/portfolio.git
git push -u origin main
```

> Vercel also supports GitLab and Bitbucket — the import flow is identical.

---

### Step 2 — Create a Vercel account

Go to [vercel.com](https://vercel.com) and sign up with your GitHub account. Authorise the GitHub integration when prompted — this is what lets Vercel watch your repo and trigger automatic deploys on every push.

---

### Step 3 — Import the project

1. From the Vercel dashboard click **Add New… → Project**
2. Find your repository in the list and click **Import**
3. Vercel will detect it as a Next.js project automatically — you will see the framework preset set to **Next.js** and the build/install commands pre-filled from `vercel.json`:

   | Setting | Value |
   |---|---|
   | Framework preset | Next.js |
   | Build command | `pnpm build` |
   | Install command | `pnpm install` |
   | Output directory | *(leave blank — Next.js default)* |
   | Node.js version | 20.x (recommended) |

   Do not change any of these.

---

### Step 4 — Add environment variables

**Do this before clicking Deploy**, otherwise the first build will succeed but the contact form will error at runtime.

1. In the import screen scroll down to **Environment Variables**
2. Add each variable one at a time:

   | Name | Value | Environment |
   |---|---|---|
   | `RESEND_API_KEY` | Your Resend API key | Production, Preview |
   | `CONTACT_TO_EMAIL` | The inbox you want to receive messages | Production, Preview |
   | `CONTACT_FROM_EMAIL` | A verified Resend sender address | Production, Preview |

3. For each variable, tick **Production**, **Preview**, and **Development** so the form works across all deployment types.

> If you add or update an env var after a project is already deployed, go to **Settings → Environment Variables**, make the change, then go to **Deployments**, find the latest deployment, click the **⋯** menu and select **Redeploy** to apply it.

---

### Step 5 — Deploy

Click **Deploy**. Vercel will:

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm build` (`next build`)
4. Publish the output to its global edge network

The first build takes about 60–90 seconds. When it finishes you get a live URL like `portfolio-username.vercel.app`.

---

### Step 6 — Add a custom domain

1. Go to your project in the Vercel dashboard → **Settings → Domains**
2. Type your domain (e.g. `yourname.dev`) and click **Add**
3. Vercel will show you one of two options depending on your setup:

   **Option A — Nameservers (recommended for a root domain)**
   Point your domain's nameservers to Vercel's nameservers. Your registrar's DNS settings panel is where you do this. Changes propagate in minutes to a few hours.

   **Option B — DNS records (if you want to keep your current nameservers)**
   Add the `A` record and/or `CNAME` record Vercel provides to your DNS provider:

   | Type | Name | Value |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

4. Once Vercel detects the DNS change it automatically issues a free TLS certificate (Let's Encrypt) and your site goes live on `https://yourname.dev`.

> DNS propagation typically takes 5–30 minutes with Cloudflare, up to a few hours with other registrars.

---

### Automatic deployments

Once connected, every `git push` to `main` triggers a new production deployment automatically. Pushes to any other branch create a **Preview deployment** — a fully functional isolated URL you can share for review before merging. Preview deployments also get your env vars if you ticked the Preview scope in Step 4.

---

### Checking deployment logs

If a deployment fails:

1. Go to **Deployments** in your project dashboard
2. Click the failed deployment
3. Click **Build Logs** — errors from `pnpm build` appear here verbatim
4. Click **Runtime Logs** — errors from the serverless contact form route appear here

---

### Analytics & Speed Insights

`@vercel/analytics` and `@vercel/speed-insights` are already imported in `app/layout.tsx`. They activate automatically once deployed — no dashboard config needed. To view the data:

- **Analytics** → your project → **Analytics** tab (real user page views, top pages, referrers)
- **Speed Insights** → your project → **Speed Insights** tab (Core Web Vitals per page, percentile breakdown)

Both are free on the Vercel Hobby plan.

---

## Project structure

```
portfolio/
├── app/
│   ├── api/contact/route.ts    # Resend email handler (serverless function)
│   ├── globals.css             # Tailwind v4 theme + base styles
│   ├── layout.tsx              # Root layout: fonts, cursor, smooth scroll
│   └── page.tsx                # Page: assembles all sections
├── components/
│   ├── cursor/
│   │   └── CustomCursor.tsx    # Dot + ring cursor with spring lag
│   ├── navigation/
│   │   └── Navbar.tsx          # Fixed nav, blur on scroll, mobile overlay
│   ├── sections/
│   │   ├── Hero.tsx            # Split text + Three.js background
│   │   ├── About.tsx           # Bio, parallax image, marquee, stats
│   │   ├── Projects.tsx        # Draggable horizontal scroll cards
│   │   ├── Skills.tsx          # Bento grid
│   │   ├── Experience.tsx      # Animated timeline
│   │   ├── Testimonials.tsx    # Auto-advancing carousel
│   │   ├── Contact.tsx         # Form + Resend + copy email
│   │   └── Footer.tsx          # Minimal footer
│   ├── three/
│   │   └── HeroScene.tsx       # R3F particle field + grid (ssr: false)
│   └── ui/
│       ├── GrainOverlay.tsx    # Fixed SVG grain texture
│       ├── MagneticButton.tsx  # Cursor-tracking magnetic CTA
│       └── SmoothScroll.tsx    # Lenis + Framer Motion useAnimationFrame
├── types/
│   └── three-fiber.d.ts        # R3F JSX type shim for TypeScript
├── .env.local.example          # Environment variable template
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── vercel.json
```

---

## Local scripts

```bash
pnpm dev      # Start dev server with Turbopack
pnpm build    # Production build
pnpm start    # Serve the production build locally
pnpm lint     # Run ESLint
```

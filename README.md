# Adrian Runiewicz — Portfolio

> AI Product Engineer / System Builder. Buduję produkty AI end-to-end.

Personal site / portfolio. Live: TBD.

## Projekty pokazane w portfolio

- **Career Guide** — co-creator @ Crait P.S.A. (ProfileVector, matcher engine, Avi 3D)
- **RuneWitch** — solo founder, mitologia nordycka × AI
- **Rybai** — frontend + product owner, RAG dla wędkarzy
- **Akasha** — solo dev, prywatny AI dashboard

## Stack

React 19 · TypeScript · Vite 8 · Tailwind 4 · Framer Motion · @tsparticles · @emailjs/browser

## Lokalnie

```bash
npm install
cp .env.example .env       # wypełnij klucze EmailJS, jeśli chcesz formularz wysyłał maile
npm run dev                # http://localhost:5173 (lub :4488 z .claude/launch.json)
```

Bez kluczy EmailJS formularz kontaktowy fallback'uje na `mailto:`.

## Build

```bash
npm run build              # tsc -b && vite build → dist/
npm run preview            # podgląd build'u lokalnie
npm run lint               # ESLint
```

## Deploy

Vercel — automatyczny deploy z `main`. Klucze EmailJS jako env vars w panelu Vercel.

## Struktura

```
src/
  sections/      # 10 sekcji portfolio (Hero, About, Timeline, …)
  components/    # Sidebar, SlideNav, ContactForm, …
  contexts/      # Language (PL/EN), Theme (dark/light), Sidebar
  styles/        # tokens.css (Aura design system), global.css, layout.css
public/
  projects/      # screeny projektów (PNG)
  notebooks/     # rendered EDA notebooks (HTML)
  certificates/  # PDF certyfikatów
```

## Aura design system

Trzy aury (Aether / Vital / Flow), każda sekcja używa jednej dominującej. Tokeny w [src/styles/tokens.css](src/styles/tokens.css).

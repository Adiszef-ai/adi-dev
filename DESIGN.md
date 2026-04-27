# Adrian Runiewicz — Portfolio Design System

> Personal brand: **AI Product Engineer / System Builder**
> Wersja: 0.1 — kierunek brandowy do dopracowania w Stitch

---

## 1. Brand identity

**Kim jestem (jednym oddechem):**
AI Product Engineer i System Builder. Buduję produkty AI end-to-end — od architektury, przez backend, frontend, modele 3D, po deployment. Solo founder RuneWitch, co-creator Career Guide, frontend & PO Rybaika.

**Brand keywords:** `spirytualny` · `iridescent` · `fluid` · `energetyczny` · `aura` · `system-builder`

**Audience:** rekruterzy AI/tech, founderzy szukający partnera technicznego, peer devs, klienci szukający kogoś kto dowozi produkty AI od koncepcji po produkcję.

**Mood:** AI jako energia / dusza / życie. Mix mistycyzmu nordyckiego (RuneWitch DNA) z futurystyczną estetyką AI-native. NIE ma to być cyberpunk — ma to być coś bliższego *aurze życia*, *płynnej energii*, *kosmicznej intuicji*.

**Czego unikamy:**
- klasycznego "tech bro" / hard cyberpunk
- emoji w UI
- glassmorphism w stylu Apple
- generycznych saas gradientów (purple→pink jak każdy startup)
- sztywnych prostokątów i mocnych ostrych krawędzi
- statycznych, "martwych" komponentów (wszystko ma się "mienić")

---

## 2. Color system — "Aura System"

System bazuje na **3 aurach** (każda to gradient o własnym charakterze) + bazowej ciemności + neutralnych. Aury subtelnie się łączą, nie zlewają — każda sekcja / komponent ma JEDNĄ dominującą aurę.

### 2.1 Aura Aether (zimna · kosmiczna · mentalna)

Z napisu **Akasha**. Reprezentuje: świadomość, wiedzę, system, AI jako intelekt.

| Stop | Hex | Rola |
|---|---|---|
| Start | `#22D3EE` | cyan — clarity, data |
| Mid | `#6366F1` | indigo — depth, system |
| End | `#D946EF` | fuchsia — insight, magic |

**Gradient CSS:**
```css
--aura-aether: linear-gradient(135deg, #22D3EE 0%, #6366F1 50%, #D946EF 100%);
```

**Użycie:** hero typing animation, headline gradients, RuneWitch card, Akasha card, navigation active state.

### 2.2 Aura Vital (ciepła · energetyczna · witalna)

Z napisu **Deploy**. Reprezentuje: energię, akcję, pasję, "dowożenie".

| Stop | Hex | Rola |
|---|---|---|
| Start | `#FB7185` | coral — passion, alarm |
| Mid | `#E879F9` | magenta — drive, presence |
| End | `#A855F7` | violet — power, depth |

**Gradient CSS:**
```css
--aura-vital: linear-gradient(135deg, #FB7185 0%, #E879F9 50%, #A855F7 100%);
```

**Użycie:** primary CTA buttons, Career Guide card accent, Avi 3D mentions, "Live" / available status, hover states na primary.

### 2.3 Aura Flow (płynna · transformacyjna · intuicyjna)

Z rainbow drip — wycinek transformacyjny. Reprezentuje: przepływ, naturę, transformację, growth.

| Stop | Hex | Rola |
|---|---|---|
| Start | `#34D399` | mint — growth, fresh |
| Mid | `#F472B6` | rose — warmth, care |
| End | `#FBBF24` | amber — vitality, signal |

**Gradient CSS:**
```css
--aura-flow: linear-gradient(135deg, #34D399 0%, #F472B6 50%, #FBBF24 100%);
```

**Użycie:** Rybaika card, secondary CTAs, success states, hover na technology tags, sekcja About background blob.

### 2.4 Bazowa ciemność (canvas)

Dark mode-first. Tło z subtelnym fioletowym podtonem (nie czyste czarne).

| Token | Hex | Użycie |
|---|---|---|
| `--bg-deep` | `#08070D` | główne tło aplikacji |
| `--bg-surface` | `#13111C` | karty, sekcje uniesione |
| `--bg-elevated` | `#1C1A2A` | popovers, modals, dropdowns |
| `--bg-glass` | `rgba(28, 26, 42, 0.6)` | overlays z backdrop-blur |

### 2.5 Neutrals (typography & lines)

| Token | Hex | Użycie |
|---|---|---|
| `--text-primary` | `#F8F7FA` | headings, primary text |
| `--text-secondary` | `#A8A5B8` | body, paragraph text |
| `--text-muted` | `#6B6678` | captions, labels, metadata |
| `--border-subtle` | `#2E2A3D` | borders, dividers |
| `--border-strong` | `#4A4458` | hover borders, focus outlines |

### 2.6 Semantic colors

| Token | Hex | Użycie |
|---|---|---|
| `--success` | `#34D399` | sukces, available, online |
| `--warning` | `#FBBF24` | warning, w trakcie |
| `--danger` | `#FB7185` | error, destructive |
| `--info` | `#22D3EE` | info, neutral notification |

### 2.7 Light mode (planowany, opcjonalny)

Do dopracowania w Stitch. Bazowa idea: bardzo jasne tło `#FAFAFB` z aurami w bardziej pastelowej wersji (40-60% saturation), tekstu `#1A1A24`. Aury zachowują charakter ale są mniej elektryczne.

### 2.8 Reguły mieszania aur

**1 sekcja = 1 dominująca aura.** Mieszamy aury TYLKO na granicach sekcji (gdzie jedna zanika, druga narasta — przez `mask-image` lub SVG path).

**Hierarchia per sekcja:**
- Hero: **Aether** (kosmiczna, intro)
- About: **Flow** (osobiste, ciepłe)
- Timeline: **Aether → Flow → Vital** (chronologia = transformacja)
- Projects:
  - Career Guide → **Vital** (deploy, action)
  - RuneWitch → **Aether** (mistycyzm)
  - Rybaika → **Flow** (natura, woda)
  - Akasha → **Aether** (consciousness, dashboard)
- Skills / TechRadar: **Aether** (system, mapa)
- Contact: **Vital** (call to action)

**Subtelne łączenie:**
- Tła sekcji mają radial gradient z aury (~5-8% opacity) w jednym rogu, NIE pełen ekran
- Section dividers = SVG drip path z gradientu między aurami sąsiednich sekcji
- Hover na komponencie = aura "przeskakuje" przez `background-position` slide

---

## 3. Typography

### 3.1 Font families

| Token | Font | Użycie |
|---|---|---|
| `--font-display` | **Fraunces** Variable | h1, h2, hero name, section titles |
| `--font-body` | **Inter** lub **Geist Sans** | paragraphs, descriptions |
| `--font-mono` | **JetBrains Mono** | code, badges, labels, role tags |

**Fraunces** — variable serif z osiami `opsz`, `wght`, `SOFT`. Dla nas: SOFT=100 (maksymalna miękkość liter), opsz=144 dla hero, opsz=72 dla h2. Wybieramy charakter zamiast neutralności — Fraunces ma "duszę".

### 3.2 Type scale (8px base, modular scale 1.25)

| Token | Size | Line-height | Weight | Użycie |
|---|---|---|---|---|
| `--text-display` | 4.5rem (72px) | 1.05 | 600 | Hero name |
| `--text-h1` | 3rem (48px) | 1.1 | 600 | Section titles |
| `--text-h2` | 2.25rem (36px) | 1.2 | 500 | Subsection titles |
| `--text-h3` | 1.5rem (24px) | 1.3 | 500 | Card titles |
| `--text-lg` | 1.25rem (20px) | 1.5 | 400 | Lead paragraphs |
| `--text-base` | 1rem (16px) | 1.65 | 400 | Body |
| `--text-sm` | 0.875rem (14px) | 1.5 | 400 | Secondary text |
| `--text-xs` | 0.75rem (12px) | 1.4 | 500 | Labels, badges |
| `--text-mono-sm` | 0.8rem (13px) | 1.4 | 400 | Code, tech tags |

### 3.3 Headlines z aurą

**Hero name** i **section titles** mają `background-clip: text` z aurą + ciągła animacja `aura-shimmer` 8s ease-in-out infinite (gradient się przesuwa po tekście).

```css
.hero-name {
  background: var(--aura-aether);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: aura-shimmer 8s ease-in-out infinite;
}

@keyframes aura-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 4. Spacing & layout

### 4.1 Base unit: **4px**

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |
| `--space-10` | 128px |

### 4.2 Breakpoints

| Token | Min-width | Device |
|---|---|---|
| `--bp-sm` | 640px | landscape phone |
| `--bp-md` | 768px | tablet |
| `--bp-lg` | 1024px | small laptop |
| `--bp-xl` | 1280px | desktop |
| `--bp-2xl` | 1536px | large desktop |

### 4.3 Layout

- **Sidebar nav:** 200px fixed (desktop), overlay z hamburger (<768px)
- **Main content:** max-width 1400px, padding sekcji `--space-9` (96px) desktop, `--space-7` (48px) tablet, `--space-5` (24px) mobile
- **Grid projektów:** 1 kolumna < 1024px, 2 kolumny ≥ 1024px (gap `--space-6` 32px)

---

## 5. Shape language — "Molten / Liquid"

**Filozofia:** kształty wyglądają jak rozpuszczony, lejący się kolor. NIGDY sztywne prostokąty z `border-radius: 8px`.

### 5.1 Border radius — asymetryczny organic

```css
--radius-blob-sm:  20% 80% 70% 30% / 30% 30% 70% 70%;
--radius-blob-md:  30% 70% 70% 30% / 30% 30% 70% 70%;
--radius-blob-lg:  40% 60% 60% 40% / 50% 30% 70% 50%;

--radius-pill: 9999px;
--radius-soft: 24px;  /* fallback dla mniejszych elementów */
--radius-sharp: 4px;  /* tylko gdy konieczne — np. inputy */
```

**Zasada:** karty i większe powierzchnie używają `--radius-blob-*`. Mniejsze elementy (badges, tags, buttons) używają `--radius-pill` lub `--radius-soft`.

### 5.2 Hover morph

Każdy interaktywny komponent zmienia border-radius w hover (subtelnie, 0.3s):

```css
.card {
  border-radius: var(--radius-blob-md);
  transition: border-radius 0.6s ease, transform 0.3s ease;
}
.card:hover {
  border-radius: var(--radius-blob-lg); /* "przelewa się" */
}
```

### 5.3 Section dividers

NIE klasyczna linia. SVG drip path z gradientem między aurami sąsiednich sekcji. Wysokość ~80px, organic dripping shape (jak rozpuszczony kolor opadający w dół).

### 5.4 Glow / aura around components

Cards i CTAs mają subtelny `box-shadow` z aurą (NIE pojedyncza barwa):

```css
.card-cg { /* Career Guide → Vital */
  box-shadow:
    0 0 40px -10px rgba(232, 121, 249, 0.25),
    0 0 80px -20px rgba(168, 85, 247, 0.15);
}
.card-cg:hover {
  box-shadow:
    0 0 60px -10px rgba(232, 121, 249, 0.4),
    0 0 120px -20px rgba(168, 85, 247, 0.25);
}
```

---

## 6. Components

### 6.1 Button

**Variants:**
- `primary` — fill z Aurą Vital, text biały, hover = aura przeskakuje (background-position 0% → 100%)
- `secondary` — outline z `border: 1px solid` + fill aurą na hover
- `ghost` — bez tła, text z aury, hover dodaje subtelne tło `--bg-glass`
- `icon` — kwadrat 40x40 z `--radius-blob-md`

**States:** default, hover, active (lekkie wciśnięcie `transform: scale(0.98)`), focus (outline 2px aura), disabled (opacity 0.4).

**Anatomia:**
```
[ icon? · label · icon? ]
border-radius: --radius-pill
padding: 12px 24px
font: --font-mono, --text-sm, weight 600, uppercase, tracking 0.05em
```

### 6.2 Card

**Variants:**
- `project` — duża, z badge roli, opisem, tech tags, linkiem
- `stat` — kompaktowa, z metryką (number + label)
- `info` — neutralna, z heading + paragraf

**Anatomia:**
```
[ corner aura blob (pseudo-element) ]
[ category label (mono, --text-xs, uppercase) · status dot ]
[ title (Fraunces, --text-h3) ]
[ role badge (mono, accent border) ]
[ description (--text-base) ]
[ highlight box (subtle aura tint) ]
[ tech tags (pill, mono, --text-xs) ]
[ links / CTAs ]
```

**Border-radius:** `--radius-blob-md` default, → `--radius-blob-lg` na hover.

### 6.3 Badge / Tag

- `role-badge` (na karcie projektu): pill, mono, uppercase, fill `aura @ 8% opacity`, border `aura @ 25% opacity`, text accent color
- `tech-tag` (na karcie projektu): pill, mono, neutral, hover dodaje aurę
- `status-dot`: 10px circle z aurą + animacja `pulse 3s infinite`

### 6.4 Input / Form

- `text-input`: `--radius-soft` (24px), border 1px subtle, focus = border aura + glow
- `textarea`: jak input, min-height 120px
- `label`: mono, --text-xs, uppercase, color muted

### 6.5 Navigation (sidebar)

- 200px fixed na desktop
- Each item: icon + label, active state = pill bg z aurą Aether @ 15%
- Mobile: overlay z backdrop-blur, animacja slide-in z left

### 6.6 Section divider

SVG drip path 80px wysokości, gradient z aury sekcji powyżej do aury sekcji poniżej, opacity 0.4-0.6.

---

## 7. Motion

**Filozofia:** subtle overshoot (energia), nigdy bouncy. Wszystko żyje, ale nigdy nie odwraca uwagi od treści.

### 7.1 Easings

```css
--ease-soft:    cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* domyślny */
--ease-energy:  cubic-bezier(0.34, 1.20, 0.64, 1);     /* subtle overshoot */
--ease-flow:    cubic-bezier(0.65, 0, 0.35, 1);        /* smooth in-out */
```

### 7.2 Durations

| Token | Value | Użycie |
|---|---|---|
| `--dur-fast` | 0.15s | hover color/border |
| `--dur-base` | 0.3s | default — hover scale, glow |
| `--dur-slow` | 0.6s | radius morph, layout shifts |
| `--dur-aura` | 8s | continuous aura shimmer on headlines |

### 7.3 Patterns

- **Hover na komponencie:** scale (1 → 1.02), glow expand, border-radius morph (--blob-md → --blob-lg), aura background-position slide (0% → 100%)
- **Section reveal:** fade up (y +40 → 0), 0.7s --ease-energy, stagger 0.15s na dzieciach
- **Aura shimmer:** background-position 0% ↔ 100% pętla 8s, --ease-flow infinite na headlines
- **Status dot pulse:** scale 1 ↔ 1.2 + opacity 1 ↔ 0.6, 3s infinite
- **Loading / pending:** organic blob morph (radius oscillates), nie spinner

### 7.4 Reduced motion

Respektować `@media (prefers-reduced-motion: reduce)`:
- aura shimmer → static gradient (no animation)
- hover scale → tylko zmiana koloru
- section reveal → instant fade (no y movement)

---

## 8. Iconography

- **Library:** `react-icons/fi` (Feather) — minimalistyczne, stroke 1.5-2px
- **Sizes:** 16px / 20px / 24px (default) / 32px (hero CTAs)
- **Color:** dziedziczy z parenta (text-primary lub accent aury)
- **Usage:** sparingly — ikony to dodatek do tekstu, nie zamiennik. NIGDY emoji.

---

## 9. Voice & tone

### 9.1 Język

- **Polski** jako primary, EN jako alternatywa (toggle w UI)
- **Pierwsza osoba** w About i opisach projektów ("Buduję", "Mój zakres")
- **Konkretne liczby** zamiast ogólników ("47 bogów" nie "wiele bogów", "1.5 roku" nie "długo")

### 9.2 Tone keywords

- **Honest** — nie nadinterpretujemy roli (NIGDY "Tech Lead" jeśli nim nie jestem)
- **Concrete** — nazwy modułów, wagi matcherów, liczby commitów
- **Energetic** — krótkie zdania, czasowniki w ruchu ("Buduję", "Dowożę", "Tworzę")
- **Soulful** — pozwalamy sobie na metaforę spirytualną tam gdzie pasuje (aury, Patron, ścieżka)

### 9.3 Czego NIE piszemy

- "passionate developer with strong skills in..."
- "synergie", "leverage", "10x engineer"
- "innowacyjne rozwiązania" (puste słowo)
- emoji w copy 🚫

---

## 10. Accessibility

- **Kontrast:** wszystkie body teksty ≥ 4.5:1 vs tło. Headings ≥ 3:1.
- **Focus states:** zawsze widoczne (2px outline z aurą). NIE usuwać `:focus-visible`.
- **Semantic HTML:** `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` zamiast div.
- **Alt text:** każdy obraz ma sensowny alt.
- **Reduced motion:** patrz 7.4.
- **Keyboard nav:** wszystkie interaktywne elementy reachable Tabem, z widocznym focus state.

---

## 11. Implementation notes (techniczne)

- **Stack:** React 19 + TypeScript + Vite + Tailwind 4 lub vanilla CSS z custom properties
- **Animacje:** Framer Motion dla section reveals, CSS animations dla loop'ów (shimmer, pulse)
- **Fonty:** Google Fonts Variable (Fraunces, Inter, JetBrains Mono) — preload, font-display swap
- **Gradients:** CSS custom properties z `linear-gradient`, animowane przez `background-position`
- **Blobs:** asymetryczny `border-radius`, NIE clip-path (lepsza wydajność)
- **Dark mode-first**, light mode jako optional (do dopracowania)
- **Performance budget:** LCP < 2.5s, CLS < 0.1, total JS < 200KB gzip

---

## 12. Reference inspiration (mood board cues)

- Anthropic.com — clean editorial + iridescent accents
- Linear.app — soft motion, premium dark
- Vercel.com — sharp typography but liquid gradients
- Stripe homepage — section transitions, depth
- Krea.ai — molten gradient hero
- Wynter / Particles — organic shapes, drip mood

---

**Wersja:** 0.1 · **Data:** 2026-04-27 · **Autor:** Adrian Runiewicz

# Handoff Spec: Slide-Based Portfolio Navigation

> Mobile-first slide system z bottom FAB cluster. Każda sekcja = pełnoekranowe interaktywne doświadczenie. Stack: React 19 + Tailwind v4 + Framer Motion. Zgodny z Aura design system (`src/styles/tokens.css`).

## 1. Overview

Portfolio przebudowane z klasycznego scroll'a na **deck-style navigation**: każda sekcja zajmuje pełny viewport (100vh), użytkownik przechodzi między slajdami przyciskami / klawiszami / swipe'em. URL hash (`#hero`, `#about`, `#projects`...) trzyma stan slajdu — refresh wraca do tego samego miejsca, link można udostępnić.

**Dlaczego slajdy:** atomic storytelling per sekcja, mobile-friendly (kciuki, swipe), wyróżnia portfolio na tle 99% scroll'owanych konkurentów.

**Liczba slajdów:** 10 — `hero`, `about`, `timeline`, `skills`, `radar`, `projects`, `analyses`, `agents`, `certs`, `contact`.

## 2. Layout — kontener slajdów

`<main class="main">` jest scrollowanym kontenerem o `height: 100vh`. CSS `scroll-snap-type: y mandatory` powoduje że scroll snapuje do najbliższego slajdu. Każda `<section>` ma `min-height: 100vh; scroll-snap-align: start`.

| Token CSS | Wartość | Cel |
|---|---|---|
| `.main { height }` | `100vh` (`100dvh` na mobile dla iOS) | Cały viewport, nie body |
| `.main { overflow-y }` | `auto` | Scrollable container |
| `.main { scroll-snap-type }` | `y mandatory` | Wymuszone snapowanie pionowe |
| `.main { scrollbar-width }` | `none` + `::-webkit-scrollbar { display: none }` | Ukryty scrollbar |
| `.main > section { scroll-snap-align }` | `start` | Snap do top |
| `.main > section { scroll-snap-stop }` | `normal` | Pozwala scrollować przez długie sekcje gładko |
| `.main > section { min-height }` | `100vh` (`100dvh`) | Pełny viewport |
| `.main > .section-divider` | `display: none` | Niepotrzebne w slajdach |

**Mobile margin:** `.main { margin-left: 0 }` (sidebar wysuwany). Desktop (≥768px): `margin-left: 200px`.

**iOS notch:** `100dvh` zamiast `100vh` zapobiega obciętej dolnej części przy address barze Safari. Fallback: `100vh` w `@supports not (height: 100dvh)`.

## 3. Programmatic scroll — krytyczna pułapka

⚠️ `element.scrollTo({ behavior: 'smooth' })` **nie działa** w kontenerze ze `scroll-snap-type: mandatory` (Chrome bug). Trzeba pisać własny rAF-scroll:

```typescript
function smoothScrollTo(el: HTMLElement, target: number, duration = 600) {
  const start = el.scrollTop;
  const delta = target - start;
  if (Math.abs(delta) < 1) return;
  const startTime = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const p = Math.min(1, (now - startTime) / duration);
    el.scrollTop = start + delta * ease(p);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
```

Wszystkie nawigacje (FAB-y, sidebar links, klawiatura) muszą iść przez tę funkcję, nie `scrollIntoView`.

## 4. Bottom FAB cluster

Trzy FAB-y prawy-dolny + jeden hamburger lewy-dolny. Wszystkie 56×56px, okrągłe, fixed, `z-index: 1001`, `bottom: 1.25rem`.

```
[hamburger]                                    [↑]  [●]  [↓]
 left:1.25rem                                          right:1.25rem
```

| FAB | Ikona | Pozycja | Kolor | Cel |
|---|---|---|---|---|
| Hamburger | `FiMenu` / `FiX` | left, single | aether (`#22d3ee`) | Otwiera sidebar |
| Prev | `FiChevronUp` | right cluster #1 | aether (`#22d3ee`) | Poprzedni slajd |
| Action | `FiGrid` (default) | right cluster #2 | vital (`#e879f9`) | Slide overlay (siatka 10 miniatur) lub kontekstowa akcja per slajd |
| Next | `FiChevronDown` | right cluster #3 | aether (`#22d3ee`) | Następny slajd |

**Action FAB** — w MVP otwiera overlay z siatką wszystkich slajdów (kliknięcie tile = jump). W przyszłości może być **kontekstowa** per slajd (np. download CV na hero, copy email na contact).

### FAB design tokens

```css
.fab {
  width: 56px; height: 56px;
  border-radius: 9999px;
  background: rgba(20, 18, 32, 0.85);
  border: 1px solid var(--color-border-strong);
  backdrop-filter: blur(16px);
  box-shadow:
    0 0 18px -8px <accent-glow>,    /* aury glow */
    0 8px 20px -6px rgba(0,0,0,0.5); /* drop shadow */
  transition: transform .2s, box-shadow .2s, border-color .2s;
}
.fab:hover, .fab:active {
  transform: scale(1.05);
  border-color: <accent-color>;
  box-shadow: 0 0 30px -6px <accent-glow-strong>, 0 8px 20px -6px rgba(0,0,0,0.5);
}
.fab:disabled { opacity: 0.35; cursor: not-allowed; }
```

`<accent-color>`:
- Hamburger / Prev / Next: `--color-aura-aether-start: #22d3ee`
- Action: `--color-aura-vital-mid: #e879f9`

### Action FAB — counter badge

Mały okrągły badge w prawym-dolnym narożniku Action FAB pokazuje `1/10`, `2/10` itd. Font: `JetBrains Mono`, `0.65rem`, vital border. To natychmiastowa informacja "gdzie jestem".

## 5. Slide Overlay (klik na Action FAB)

Pełnoekranowy modal z siatką miniatur wszystkich slajdów. Tap miniaturę = `goToIdx(n)` + zamknięcie overlay.

| Property | Mobile (<640) | Desktop (≥640) |
|---|---|---|
| Grid columns | 2 | 3 |
| Max width | 28rem | 40rem |
| Tile min-h | 96px | 96px |
| Backdrop | `rgba(8,7,13,0.78) + blur(12px)` | jw. |

Tile struktura:
```
┌─────────────────┐
│ 03              │  ← num (font-mono, .7rem, tracking .18em, muted)
│                 │
│                 │
│ TIMELINE        │  ← label (font-mono, .7rem, uppercase, tracking .15em)
└─────────────────┘
```

Active state (current slide): vital border + glow + lekkie vital-tinted tło.

**Tap-out / ESC**: zamyka overlay. Backdrop click też.

## 6. Per-slide content rules

| Slajd | Zawartość | Specjalne |
|---|---|---|
| `hero` | Imię, role typing, opis, 2 CTA, 4 stats | Powiększone fonty na mobile, padding 1.5rem |
| `about` | Bio, stats, mocne strony | Vertical stack na mobile (1 col), 2-col na md |
| `timeline` | Doświadczenie chronologiczne | Wertikalna oś z dotami; długie — internal scroll lub split |
| `skills` | Grupy: Languages, Frameworks, AI, Infra | Chipy z ikonami, flex-wrap |
| `radar` | Tech radar (hexy macierz quadrant×ring) | Mobile: zamień na **grupowaną listę po ringach** (4 sekcje stacked) |
| `projects` | 4 projekty | Mobile: **każdy projekt = osobny sub-slajd** (h-swipe wewnątrz `projects` slajdu) |
| `analyses` | EDA notebooks | Karta-per-analiza, długie: internal scroll |
| `agents` | RuneWitch workflow + demo | Diagram horyzontalny na desktop, **wertikalny stack na mobile** |
| `certs` | Certyfikaty | Lista pionowa, min-h tile, ikony |
| `contact` | Form + social linki | Stack, duże touch targets |

## 7. Long-content slide handling

Sekcje > 100vh (Projects, Analyses, Certs, Timeline) potrzebują strategii:

**Strategie (per sekcja):**

- **A) Compress** — wytnij/skróć content (Hero, About, Contact)
- **B) Internal vertical scroll** — sekcja ma `overflow-y: auto`, `scroll-snap-stop: normal` aby user scrollował wewnątrz; snap do następnej sekcji włącza się dopiero przy końcu (Analyses, Timeline)
- **C) Sub-slides** — sekcja ma własny horizontal carousel (Projects: 4 projekty = 4 horizontal sub-slides w jednym vertical slajdzie)

## 8. Responsive breakpoints

| Breakpoint | Tailwind prefix | Width | Sidebar | Padding sekcji | FAB-y |
|---|---|---|---|---|---|
| Mobile | (default) | <640 | Hidden, hamburger toggles | `px-6` (24px) | All visible |
| Small | `sm:` | ≥640 | Hidden, hamburger | `px-8` (32px) | All visible |
| Medium | `md:` | ≥768 | Hidden, hamburger | `px-10` | All visible |
| Large | `lg:` | ≥1024 | **Permanent left rail** 200px | `px-12` | Hide hamburger (sidebar always visible), keep nav arrows + action |
| XL | `xl:` | ≥1280 | Permanent left rail | `px-16` | Show keyboard hint |

⚠️ **Custom spacing scale** w `tokens.css`: `--spacing-8: 4rem` (NIE 2rem jak Tailwind default). Czyli `px-8` = 64px, nie 32px! Użyj `px-6` dla 32px na mobile.

## 9. Slide transition behavior

| Trigger | Action | Animation |
|---|---|---|
| Click Next/Prev FAB | `smoothScrollTo(main, target, 600ms)` | ease-in-out cubic |
| Click sidebar link | jw. | jw. |
| Click overlay tile | jw. | jw. |
| Keyboard `↓`/`PageDown` | next slide | jw. |
| Keyboard `↑`/`PageUp` | prev slide | jw. |
| Keyboard `Home` | slide 0 | jw. |
| Keyboard `End` | last slide | jw. |
| Touch swipe vertical | natywny scroll-snap | natywny smooth |
| URL hash on load | scroll do `#${hash}` po `100ms` delay | jw. |

**ScrollProgress bar** (top 3px gradient): śledzi `useScroll({ container: mainRef })`, NIE window scroll.

## 10. Interaction states

| Element | State | Visual |
|---|---|---|
| FAB nav | default | accent color, subtle glow |
| FAB nav | hover/active | scale(1.05), accent border, strong glow |
| FAB nav | disabled (first/last slide) | opacity 0.35, no cursor |
| FAB action | default | vital color + counter badge |
| FAB action | hover | jw. + scale + strong glow |
| Sidebar link | default | muted text, no bg |
| Sidebar link | active (current section) | aether-mid text + bg + glow |
| Sidebar link | hover | text-primary, bg-glass, border-subtle |
| Overlay tile | default | bg-elevated, border-subtle |
| Overlay tile | hover | translateY(-2px), aether-mid border, bg darker |
| Overlay tile | active (current) | vital-mid border + glow + tint |

## 11. Accessibility

| Feature | Implementation |
|---|---|
| Keyboard nav | `↑/↓/PageUp/PageDown/Home/End` na window, ignoruje gdy focus w input/textarea |
| FAB ARIA | `aria-label="Previous slide"`, `"Next slide"`, `"All slides"`, `"Menu"` |
| Hash sync | `history.replaceState` (nie `pushState` — nie zaśmieca history) |
| Focus management | Po kliknięciu sidebar link → focus na pierwszy interactive element nowego slajdu (opcjonalne, MVP skip) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — wyłącz `aura-shimmer`, `blob-morph`. Smooth scroll → instant. |
| Screen reader | Każda `<section>` ma `id` (= slide name) + opcjonalny `aria-label` z tłumaczeniem |
| Skip nav | Skip link "Pomiń do contentu" dla SR users (na desktop sidebar to overhead) |

## 12. Edge cases

- **iOS Safari address bar shrinks viewport** → użyj `100dvh` zamiast `100vh`
- **Orientacja landscape mobile** (np. 812×375) → slajdy stają niskie, hero z dużym imieniem może się przeciąć. Strategia: `max-width: 90vw` na imieniu + scale-down typografii w `@media (orientation: landscape) and (max-height: 500px)`
- **Bardzo duży viewport (>1920)** → slajdy mają dużo pustki. Użyj `max-w-7xl mx-auto` na content w sekcjach
- **No-JS** → snap-scroll i hash links nadal działają (CSS-only). Sidebar nav `<a href="#id">` zachowuje fallback. FAB-y bez JS są martwe.
- **Bardzo długi tekst (i18n)** → np. EN "Available for cooperation" wraps. Wszystkie labels mają `text-wrap: balance` lub explicit `max-w` na chip-ach
- **Slow connection** → particles background lazy-loaded (intersection observer). Hero readable bez nich
- **Touch swipe między slajdami** — natywny scroll-snap obsługuje. Nie potrzeba framer-motion drag (over-engineering MVP)

## 13. Animation specs

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Slide change (button) | `scrollTop` lerp | 600ms | `ease-in-out cubic` (`t<.5 ? 4t³ : 1-(-2t+2)³/2`) |
| FAB hover | `transform: scale(1.05)` | 200ms | `ease` |
| FAB shadow | `box-shadow` swap | 200ms | `ease` |
| Overlay open | `opacity 0→1, scale 0.92→1` | 280ms | `spring(damping:22, stiffness:280)` |
| Overlay close | reverse | 280ms | jw. |
| Overlay tile hover | `translateY(-2px)` | 180ms | `ease` |
| Sidebar slide-in | `translateX(-100% → 0)` | 300ms | `ease` |
| Aura shimmer (background) | `background-position` | 8s | `ease-in-out infinite` |
| Particles | losowy ruch (tsparticles) | continuous | provided by lib |

## 14. Implementation checklist

- [x] `SlideNav.tsx` z 3 FAB-ami + counter + overlay
- [x] CSS scroll-snap na `.main`
- [x] `smoothScrollTo` (rAF, bypass smooth-scroll bug)
- [x] Hash sync (init + onclick)
- [x] Keyboard navigation (↑↓ PgUp PgDn Home End)
- [x] IntersectionObserver scoped to `.main` for active slide
- [x] Hamburger FAB bottom-left (was top-left)
- [x] BackToTop component removed (replaced by Prev FAB)
- [x] Sidebar links use `smoothScrollTo` (intercept default anchor)
- [ ] ScrollProgress bound to `.main` container (in progress)
- [ ] iOS `100dvh` fallback
- [ ] Per-slide mobile-first content layout (Hero ✅, reszta TBD)
- [ ] Long-content strategies (Projects → sub-slides; Analyses/Timeline/Certs → internal scroll)
- [ ] Reduced-motion overrides
- [ ] Skip-to-content link

## 15. Files

- `src/components/SlideNav.tsx` — główny komponent nav + overlay + smoothScrollTo
- `src/components/Sidebar.tsx` — nav linki używają smoothScrollTo
- `src/components/ScrollProgress.tsx` — śledzi `.main` scroll, nie window
- `src/styles/layout.css` — `.main`, `.slide-nav`, `.slide-overlay`, FAB style
- `src/styles/tokens.css` — Aura tokens (źródło prawdy kolorów)
- `src/App.tsx` — `<SlideNav />` zamiast `<BackToTop />`
- `G:\brain\Adi-Master\03 Wiedza\aura-design-system-portfolio-paleta.md` — pełna referencja kolorystyczna

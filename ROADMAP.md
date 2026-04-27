# Portfolio — Roadmap

## Sekcje

- [x] **Hero** — typing effect, stats, CTA, gradient imię
- [x] **O mnie** — avatar z gradient ring, 3 akapity, status "dostępny", 4 animowane countery (linie kodu, aplikacje, języki, commity)
- [x] **Timeline / Doświadczenie** — oś czasu z 4 kamieniami milowymi, animacje slide-in z lewej/prawej, responsywna
- [x] **Skills** — 6 kategorii z ikonami Simple Icons (Python, React, Docker...), hover glow
- [x] **Tech Radar** — interaktywny diagram SVG, 4 pierścienie (Mastered/Using/Learning/Exploring), 20 technologii, legenda
- [x] **Projekty** — karty Career Guide, RuneWitch, Afirmator z tech tagami, highlight, linki OPEN APP
- [x] **Analizy** — 3 karty notebooków z mini-wykresami SVG (bar/line/scatter), metryki, placeholder na prawdziwe notebooki
- [x] **AI Agenci** — diagram przepływu multi-agent (Supervisor→Researcher/Analyzer/Executor), live demo z symulacją
- [x] **Certyfikaty** — 6 kart z emoji, badge, data, tagi, kolorowy pasek, placeholder na prawdziwe certy
- [x] **Kontakt** — formularz EmailJS + karty GitHub/LinkedIn/Email
- [x] **Tech Stack wizualny** — ikony Simple Icons przy każdej technologii + ikony kategorii

## Funkcjonalności

- [x] **Dark/Light mode toggle** — pełny light theme z osobnym zestawem zmiennych CSS
- [x] **Wielojęzyczność PL/EN** — przycisk EN/PL w sidebar, ~80 kluczy tłumaczeń
- [x] **Formularz kontaktowy** — EmailJS z fallbackiem na mailto, stany idle/sending/success/error
- [x] **Scroll progress bar** — gradient cyan→amber, Framer Motion spring
- [x] **Aktywny link w sidebar** — IntersectionObserver śledzi widoczną sekcję, highlight z glow
- [x] **Back to top button** — pojawia się po 400px scrollu, fade-in/out, smooth scroll
- [x] **Easter egg** — Konami code (↑↑↓↓←→←→BA) → animacja 24 run Elder Futhark + napis RuneWitch w runach
- [ ] **Animowane screeny projektów** — podgląd/screenshot na hover w kartach

## SEO & Profesjonalizm

- [x] **Meta tagi + Open Graph** — title, description, og:tags, twitter:card
- [x] **Favicon** — SVG gradient cyan→amber z literami "AR"
- [ ] **Analytics** — Plausible / Umami (privacy-friendly, darmowe)

## Jeszcze do zrobienia

- [ ] **Testimonials / Referencje** — opinie współpracowników
- [ ] **Blog / Case Studies** — artykuły o AI, case studies z projektów
- [ ] **Animowane screeny projektów** — mockupy z screenshotami
- [ ] **404 page** — stylowa strona błędu

## Deploy

- [ ] **Repozytorium GitHub** — push kodu
- [ ] **Vercel** — podpięcie repo, automatyczny deploy
- [ ] **Domena** — opcjonalnie custom domena (np. adrianruniewicz.dev)

---

## Zrealizowane — szczegóły techniczne

### Stack
- **React 18 + TypeScript** (Vite 8)
- **Framer Motion** — animacje sekcji, kart, timeline, countery, easter egg
- **react-type-animation** — typing effect w hero
- **@tsparticles** — animowane particles w tle (cyan/amber)
- **react-icons** (Fi + Si) — ikony nawigacji i technologii (~30 ikon)
- **@emailjs/browser** — formularz kontaktowy

### Styl
- Inspirowany admin panelem RuneWitch — cyberpunk/tech dashboard
- Kolory: cyan (`#06b6d4`) + amber (`#f59e0b`) na ultra-ciemnym tle (`#0a0a0f`)
- Font display: **Cinzel** (serif), body: **Inter**, mono: **JetBrains Mono**
- Glassmorphism karty z `backdrop-filter: blur` i semi-transparentnym tłem
- 3 warstwy background glow (cyan, amber, gradient) z animacją `glowFloat`
- Responsywny layout z sidebar (chowa się na mobile z hamburger menu)
- Light theme z pełnym zestawem zmiennych CSS (`[data-theme='light']`)
- Scroll progress bar (Framer Motion spring)
- Gradient dividers między sekcjami (cyan→amber→cyan)

### Architektura
- **9 sekcji** w osobnych plikach (`src/sections/`)
- **6 komponentów** reużywalnych (`src/components/`)
- **2 konteksty** React (Language, Theme)
- **~80 kluczy tłumaczeń** PL/EN
- Sidebar z **9 linkami nawigacji** + aktywna sekcja via IntersectionObserver
- CSS w 2 plikach: `global.css` (zmienne, animacje, theme) + `layout.css` (komponenty, responsive)

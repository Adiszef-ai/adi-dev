# Stitch Prompt — Adrian Runiewicz Portfolio

> Skopiuj sekcję `## PROMPT` poniżej do Google Stitch (https://stitch.withgoogle.com/).
> Możesz też wgrać 2 obrazy referencyjne: gradient text z napisu "Akasha" oraz drip rainbow.

---

## PROMPT

Design a personal portfolio website for **Adrian Runiewicz**, an AI Product Engineer and System Builder. The brand identity is **spiritual, iridescent, fluid, energetic** — think "AI as life energy / aura / consciousness," NOT cyberpunk or generic SaaS.

### Visual direction

- **Aesthetic:** AI-native, iridescent, with a subtle spiritual / mystical undertone. Inspired by Norse mythology (one of the projects is RuneWitch) but expressed through liquid color, not literal motifs.
- **Mood:** dark mode first. Background is near-black with a faint violet undertone (#08070D), not pure black. Sections feel like a dark canvas with auras of light bleeding in from corners.

### Color system — "Aura System" (3 gradients, no overlap)

Use these THREE gradients as the only sources of color. Each section uses ONE dominant aura. Auras blend ONLY at section boundaries via SVG drip transitions.

1. **Aura Aether** (cosmic / mental / consciousness)
   `linear-gradient(135deg, #22D3EE → #6366F1 → #D946EF)`
   Used for: hero text, section headlines, RuneWitch and Akasha cards, navigation.

2. **Aura Vital** (warm / energetic / action)
   `linear-gradient(135deg, #FB7185 → #E879F9 → #A855F7)`
   Used for: primary CTAs, Career Guide card, "Live" status, hover states.

3. **Aura Flow** (fluid / transformative / growth)
   `linear-gradient(135deg, #34D399 → #F472B6 → #FBBF24)`
   Used for: Rybaika card, About section background blob, success states.

**Neutrals:** text primary `#F8F7FA`, secondary `#A8A5B8`, muted `#6B6678`, borders `#2E2A3D`.

### Typography

- **Display (h1, h2, hero name):** **Fraunces** Variable serif, weight 600, soft axis at 100. Used with `background-clip: text` on the auras + a continuous 8s shimmer animation that slides the gradient across the letters.
- **Body:** **Inter** or **Geist Sans**, weight 400/500.
- **Mono (badges, tech tags, labels, code):** **JetBrains Mono**, weight 400-500, uppercase for labels.

### Shape language — "Molten / Liquid"

NO standard rounded rectangles. Use **asymmetric organic blob radii**:
- Cards: `border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%`
- On hover, the radius morphs to a different blob shape over 0.6s — like liquid resettling.
- Buttons: pill-shaped or organic blob
- Section dividers are NOT lines — they're **SVG drip paths**, ~80px tall, with a gradient fading from one section's aura to the next, like dripping melted color.

### Components

- **Sidebar nav** (200px fixed left on desktop, hamburger overlay on mobile): logo + initials, list of section links with subtle aura highlight on the active item, theme toggle, EN/PL toggle, social icons.
- **Hero section:** name in huge Fraunces with Aether aura + shimmer, typing animation cycling through "AI Product Engineer / System Builder / Full Stack Developer / Solo Founder", short paragraph, primary CTA + ghost CTA, 4 stat cards (numbers + labels in mono).
- **About section:** circular avatar placeholder with aura ring, three paragraphs (personal story → professional ownership → vision), 4 metric counters at the bottom (lines of code, projects, languages, commits).
- **Timeline section:** vertical timeline with alternating left/right cards (year + title + description), each milestone marked by a dot with the section's aura color.
- **Projects grid:** 2x2 on desktop, 1 column on mobile. Four cards with this anatomy: small category label (mono uppercase) + status dot, project title (Fraunces), role badge (mono pill with project's aura accent), description, highlight box, tech tags (pill), CTA links. Each card uses ONE of the three auras as its accent.
- **Contact section:** clean form (name, email, message) with organic blob inputs, send button using Aura Vital.

### Motion

- **Hover on any interactive component:** subtle scale (1 → 1.02), border-radius morphs to a different blob shape, gradient background-position slides from 0% to 100%, glow expands. Duration 0.3s, easing `cubic-bezier(0.34, 1.20, 0.64, 1)` (subtle overshoot).
- **Aura shimmer on headlines:** continuous 8s loop, infinite.
- **Section reveals on scroll:** fade up 40px → 0, 0.7s, stagger 0.15s on children.
- **NEVER:** bouncy spring animations, generic "AOS" reveals, glassmorphism blur on cards.

### What to AVOID (hard rules)

- NO emoji anywhere in the UI
- NO classic rounded rectangles (border-radius: 8px / 12px / 20px) — use organic blobs
- NO purple→pink generic SaaS gradient
- NO cyberpunk neon scanlines / glitch effects
- NO glassmorphism (frosted glass cards)
- NO static, "dead" components — everything must subtly animate on hover
- NO icons replacing text in primary actions (icons supplement, never substitute)

### Voice & tone in copy

- Polish primary, English alternate
- First person, concrete numbers ("47 Norse gods," not "many gods"; "1.5 years solo dev," not "long time")
- Honest about role: "AI Product Engineer" / "co-creator" / "ownership of X" — NEVER "Tech Lead"
- Energetic, soulful, no buzzwords ("synergy," "10x," "innovative solutions")

### Sections to include (in order)

1. Hero
2. About
3. Timeline (career milestones)
4. Skills
5. Tech Radar (visual map)
6. Projects (4 cards: Career Guide / RuneWitch / Rybaika / Akasha)
7. Analyses (data notebooks showcase)
8. AI Agents (multi-agent demos)
9. Certifications
10. Contact form
11. Footer

### Devices

Design for **desktop (1440px), tablet (768px), and mobile (375px)**. Sidebar collapses to a hamburger overlay below 768px.

---

## Optional appendix — what the brand stands for

Adrian builds AI products end-to-end: from architecture to deployment. Co-creator of Career Guide (built ProfileVector engine, 5-matcher scoring system, 200 React components, a 3D avatar with lip-sync), solo founder of RuneWitch (Norse mythology + AI app, 47 gods, 6 UI languages, 1.5 years of solo development), frontend & product owner at Rybaika (3-person fishing AI platform team), and runs a personal AI dashboard daily. The portfolio should feel like a window into someone who treats software as both engineering and craft — technically rigorous, emotionally alive.

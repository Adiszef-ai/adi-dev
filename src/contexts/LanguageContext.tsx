import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'pl' | 'en';

interface Translations {
  [key: string]: { pl: string; en: string };
}

const translations: Translations = {
  // Hero
  greeting: { pl: 'CZEŚĆ, JESTEM', en: 'HI, I\'M' },
  heroDesc: {
    pl: 'AI Product Engineer / System Builder. Buduję produkty AI end-to-end — od architektury po deployment. Co-creator Career Guide (ProfileVector, system matchowania, Avi 3D), solo founder RuneWitch, frontend & product owner Rybaika.',
    en: 'AI Product Engineer / System Builder. I build AI products end-to-end — from architecture to deployment. Co-creator of Career Guide (ProfileVector, matching engine, Avi 3D avatar), solo founder of RuneWitch, frontend & product owner at Rybaika.',
  },
  viewProjects: { pl: 'Zobacz projekty', en: 'View projects' },
  contact: { pl: 'Kontakt', en: 'Contact' },
  projectsLive: { pl: 'projekty live', en: 'live projects' },
  yearsAI: { pl: 'lat w AI/ML', en: 'years in AI/ML' },
  languages: { pl: 'języki programowania', en: 'programming languages' },
  enthusiast: { pl: 'solo + team', en: 'solo + team' },

  // Nav
  navAbout: { pl: 'O MNIE', en: 'ABOUT' },
  navProjects: { pl: 'PROJEKTY', en: 'PROJECTS' },
  navContact: { pl: 'KONTAKT', en: 'CONTACT' },

  // Skills
  skillsLabel: { pl: 'UMIEJĘTNOŚCI', en: 'SKILLS' },
  catLanguages: { pl: 'JĘZYKI', en: 'LANGUAGES' },
  catFrameworks: { pl: 'FRAMEWORKS', en: 'FRAMEWORKS' },
  catAI: { pl: 'AI / ML', en: 'AI / ML' },
  catDatabases: { pl: 'BAZY DANYCH', en: 'DATABASES' },
  catCloud: { pl: 'CLOUD & DEVOPS', en: 'CLOUD & DEVOPS' },
  catTools: { pl: 'NARZĘDZIA', en: 'TOOLS' },

  // Projects
  projectsLabel: { pl: 'PROJEKTY', en: 'PROJECTS' },
  projectsTitle: { pl: 'Produkty AI zbudowane end-to-end', en: 'AI products built end-to-end' },

  // Career Guide
  cgRole: { pl: 'co-creator @ Crait P.S.A.', en: 'co-creator @ Crait P.S.A.' },
  cgDesc: {
    pl: 'Platforma matchująca kandydatów IT z ofertami pracy. Moja działka: ProfileVector (silnik wektoryzacji profili, v1.0 → 1.3), engine 5 matcherów (Tech 30% / Exp 25% / Soft 18% / Loc 15% / Lang 12%), ~200 komponentów React, Avi — avatar 3D z lip-sync real-time, landing page. ThreadPoolExecutor dla równoległego scoringu, 397 ofert w produkcji.',
    en: 'Platform matching IT candidates with job offers. My ownership: ProfileVector (profile vectorization engine, v1.0 → 1.3), 5-matcher scoring engine (Tech 30% / Exp 25% / Soft 18% / Loc 15% / Lang 12%), ~200 React components, Avi — 3D avatar with real-time lip-sync, landing page. ThreadPoolExecutor for parallel scoring, 397 offers in production.',
  },
  cgHighlight: {
    pl: 'Ownership: ProfileVector + Matcher Engine + Avi — od architektury po produkcję',
    en: 'Ownership: ProfileVector + Matcher Engine + Avi — from architecture to production',
  },

  // RuneWitch
  rwRole: { pl: 'solo founder · 1.5 roku dev', en: 'solo founder · 1.5 yr dev' },
  rwDesc: {
    pl: 'Solo built end-to-end. 47 bogów nordyckich (17 aktywnych) z autorskimi promptami i głosami ElevenLabs, 24 układy runiczne Elder Futhark. System Patrona z długoterminową pamięcią — 5 nordyckich poziomów relacji (Framandi → Fylgja) z mechanizmem decay. 6 języków UI (PL/EN/DE/SV/NO/IS). Blue-green deployment na Hetzner.',
    en: 'Solo built end-to-end. 47 Norse gods (17 active) with custom prompts and ElevenLabs voices, 24 Elder Futhark rune layouts. Patron System with long-term memory — 5 Norse relationship tiers (Framandi → Fylgja) with decay mechanic. 6 UI languages (PL/EN/DE/SV/NO/IS). Blue-green deployment on Hetzner.',
  },
  rwHighlight: {
    pl: 'Multi-provider AI (Groq → Gemini → OpenAI) z auto-fallback',
    en: 'Multi-provider AI (Groq → Gemini → OpenAI) with auto-fallback',
  },

  // Rybaika
  ryRole: { pl: 'frontend + product owner · 3-os. zespół', en: 'frontend + product owner · 3-person team' },
  ryDesc: {
    pl: 'Inteligentna platforma dla wędkarzy. RAG z polskim modelem embeddings (sdadas/mmlw-roberta, 768-dim) + FAISS, 53 gatunki ryb z autorskimi grafikami, 1599 łowisk PZW na mapie, fishing index liczony z pogody. Strict TypeScript, semantic design tokens, 28/28 testów Vitest, CI/CD GitHub Actions. Mój zakres: UI, roadmap, priorytety produktowe.',
    en: 'Smart platform for anglers. RAG with Polish embeddings model (sdadas/mmlw-roberta, 768-dim) + FAISS, 53 fish species with custom artwork, 1599 PZW fishing spots on the map, weather-based fishing index. Strict TypeScript, semantic design tokens, 28/28 Vitest tests, GitHub Actions CI/CD. My scope: UI, roadmap, product priorities.',
  },
  ryHighlight: {
    pl: 'Polski RAG (sdadas/mmlw) + FAISS — wiedza wędkarska na wyciągnięcie ręki',
    en: 'Polish RAG (sdadas/mmlw) + FAISS — fishing knowledge at your fingertips',
  },

  // Akasha
  akRole: { pl: 'solo dev · personal project', en: 'solo dev · personal project' },
  akDesc: {
    pl: 'Mój personalny AI dashboard — używam codziennie. 3 tryby pracy, 25+ ekranów, 33 modułów backend, asystentka Vani z voice (22 akcje), smart context loading z dokumentacji projektów, PWA offline z IndexedDB, bioluminescent UI theme.',
    en: 'My personal AI dashboard — I use it daily. 3 work modes, 25+ screens, 33 backend modules, Vani voice assistant (22 actions), smart context loading from project docs, offline-first PWA with IndexedDB, bioluminescent UI theme.',
  },
  akHighlight: {
    pl: 'Stack: React 18 + Fastify + PostgreSQL + Groq + ElevenLabs',
    en: 'Stack: React 18 + Fastify + PostgreSQL + Groq + ElevenLabs',
  },
  akPrivate: { pl: 'Private deployment', en: 'Private deployment' },

  // Contact
  contactLabel: { pl: 'KONTAKT', en: 'CONTACT' },
  contactTitle: { pl: 'Porozmawiajmy', en: 'Let\'s talk' },
  contactSubtitle: {
    pl: 'Masz pomysł na projekt? Chcesz nawiązać współpracę? Napisz do mnie!',
    en: 'Have a project idea? Want to collaborate? Drop me a message!',
  },
  contactEmail: { pl: 'Napisz do mnie', en: 'Write to me' },

  // About
  aboutLabel: { pl: 'O MNIE', en: 'ABOUT ME' },
  aboutTitle: { pl: 'Kim jestem', en: 'Who I am' },
  aboutAvailable: { pl: 'Dostępny do współpracy', en: 'Available for work' },
  aboutP1: {
    pl: 'Jestem samoukiem z 35-letnią dawką życiowej determinacji. Przez lata pracowałem fizycznie — montowałem rusztowania — ale równolegle zawsze ciągnęło mnie do komputera. Produkcja muzyczna, Blender, montaż wideo, Photoshop — cyfrowe tworzenie to mój żywioł. W 2024 roku wsiadłem do pociągu, na który czekałem — zacząłem uczyć się programowania i AI. I od razu wiedziałem: to jest moja droga.',
    en: 'I\'m a self-taught developer with years of digital creativity behind me. While working a physically demanding job in construction, I was always drawn to computers — music production, Blender, video editing, Photoshop. In 2024 I jumped on the train I\'d been waiting for: programming and AI. From day one, I knew this was my path.',
  },
  aboutP2: {
    pl: 'Dziś działam jako AI Product Engineer. W Career Guide zbudowałem własne terytorium: ProfileVector (silnik wektoryzacji profili), engine 5 matcherów, ~200 komponentów React do Profile Matchera, oraz Avi — avatar 3D z lip-sync real-time. Od architektury, przez backend, po model w Blenderze i frontend — wszystko moje. W roadmapie: 6. matcher (Cultural Fit), 7. (Salary) i ProfileVector v1.4 z explainable embeddings.',
    en: 'Today I work as an AI Product Engineer. At Career Guide I built my own territory: ProfileVector (profile vectorization engine), the 5-matcher scoring engine, ~200 React components for the Profile Matcher, and Avi — a 3D avatar with real-time lip-sync. From architecture through backend, the Blender model and frontend — all mine. Roadmap: 6th matcher (Cultural Fit), 7th (Salary) and ProfileVector v1.4 with explainable embeddings.',
  },
  aboutP3: {
    pl: 'RuneWitch to mój flagowy solo projekt — 1.5 roku developmentu od pomysłu po deployment. 47 bogów nordyckich z autorskimi promptami, System Patrona z długoterminową pamięcią, 6 języków UI. Równolegle tworzę Rybaika (frontend + PO w 3-osobowym zespole) i własny AI dashboard, którego używam codziennie. Szukam miejsca, w którym mogę dalej budować — solo lub w mocnym zespole — produkty AI, które realnie się przydają.',
    en: 'RuneWitch is my flagship solo project — 1.5 years of development from concept to deployment. 47 Norse gods with custom prompts, Patron System with long-term memory, 6 UI languages. In parallel I lead frontend & product on Rybaika (3-person team) and run my own AI dashboard daily. I\'m looking for a place where I can keep building — solo or with a strong team — AI products that genuinely matter.',
  },
  aboutLines: { pl: 'linii kodu w produkcji', en: 'lines of code in production' },
  aboutApps: { pl: 'projekty live', en: 'live projects' },
  aboutLangs: { pl: 'języków w projektach', en: 'languages in projects' },
  aboutCommits: { pl: 'commitów (#2 contributor)', en: 'commits (#2 contributor)' },

  // Timeline
  timelineLabel: { pl: 'DOŚWIADCZENIE', en: 'EXPERIENCE' },
  timelineTitle: { pl: 'Moja ścieżka', en: 'My journey' },
  tlTitle1: {
    pl: 'Start w Data Science & AI',
    en: 'Data Science & AI Start',
  },
  tlDesc1: {
    pl: 'Rozpoczęcie przygody z programowaniem, Python, analizą danych. Dołączenie do elitarnej grupy Masterclass — współtworzenie innowacyjnych startupów z obszaru ML i AI.',
    en: 'Started programming journey with Python, data analysis. Joined elite Masterclass group — co-creating innovative startups in ML and AI.',
  },
  tlTitle2: {
    pl: 'RuneWitch — pierwszy duży projekt',
    en: 'RuneWitch — first major project',
  },
  tlDesc2: {
    pl: 'Stworzenie platformy łączącej nordycką mitologię z AI. React 19, FastAPI, multi-provider AI, gamifikacja, rozmowy głosowe z bogami. Blue-green deployment na Hetzner.',
    en: 'Built a platform combining Norse mythology with AI. React 19, FastAPI, multi-provider AI, gamification, voice conversations with gods. Blue-green deployment on Hetzner.',
  },
  tlTitle3: {
    pl: 'Career Guide — AI Product Engineer',
    en: 'Career Guide — AI Product Engineer',
  },
  tlDesc3: {
    pl: 'Co-creator w Crait P.S.A. Ownership ProfileVector, engine 5 matcherów, ~200 komponentów frontend, Avi (3D avatar z lip-sync). #2 contributor — 201 commitów, 167k linii kodu, 252 pliki 100% autorstwa.',
    en: 'Co-creator at Crait P.S.A. Ownership of ProfileVector, the 5-matcher engine, ~200 frontend components, and Avi (3D avatar with lip-sync). #2 contributor — 201 commits, 167k lines of code, 252 files 100% authored.',
  },
  tlTitle4: {
    pl: 'Rybaika — Frontend & Product Owner',
    en: 'Rybaika — Frontend & Product Owner',
  },
  tlDesc4: {
    pl: 'Dołączenie do 3-osobowego zespołu Rybaiki jako frontend i product owner. UI w strict TypeScript, semantic design tokens, roadmap, priorytety produktowe. Polski RAG (sdadas/mmlw) + FAISS.',
    en: 'Joined the 3-person Rybaika team as frontend and product owner. Strict TypeScript UI, semantic design tokens, roadmap, product priorities. Polish RAG (sdadas/mmlw) + FAISS.',
  },

  // Certifications
  certsLabel: { pl: 'CERTYFIKATY', en: 'CERTIFICATIONS' },
  certsTitle: { pl: 'Edukacja i rozwój', en: 'Education & growth' },
  certVerify: { pl: 'Weryfikuj', en: 'Verify' },
  certTitle1: { pl: 'Data Science & AI Masterclass', en: 'Data Science & AI Masterclass' },
  certIssuer1: { pl: 'Grupa Masterclass — elitarny program', en: 'Masterclass Group — elite program' },
  certTitle2: { pl: 'React — zaawansowane wzorce', en: 'React — Advanced Patterns' },
  certIssuer2: { pl: 'Kurs online', en: 'Online Course' },
  certTitle3: { pl: 'Python dla Data Science', en: 'Python for Data Science' },
  certIssuer3: { pl: 'Kurs online', en: 'Online Course' },
  certTitle4: { pl: 'FastAPI — budowa REST API', en: 'FastAPI — Building REST APIs' },
  certIssuer4: { pl: 'Kurs online', en: 'Online Course' },
  certTitle5: { pl: 'Docker & DevOps', en: 'Docker & DevOps' },
  certIssuer5: { pl: 'Kurs online', en: 'Online Course' },
  certTitle6: { pl: 'AI Agents & LLM Applications', en: 'AI Agents & LLM Applications' },
  certIssuer6: { pl: 'W trakcie', en: 'In progress' },

  // Tech Radar
  radarLabel: { pl: 'TECH RADAR', en: 'TECH RADAR' },
  radarTitle: { pl: 'Mapa technologii', en: 'Technology map' },
  radarMastered: { pl: 'Opanowane', en: 'Mastered' },
  radarUsing: { pl: 'Używam codziennie', en: 'Using daily' },
  radarLearning: { pl: 'Uczę się', en: 'Learning' },
  radarExploring: { pl: 'Eksploruję', en: 'Exploring' },
  radarQ1: { pl: 'LANGUAGES', en: 'LANGUAGES' },
  radarQ2: { pl: 'FRAMEWORKS', en: 'FRAMEWORKS' },
  radarQ3: { pl: 'INFRA', en: 'INFRA' },
  radarQ4: { pl: 'AI / DATA', en: 'AI / DATA' },

  // Analyses
  analysesLabel: { pl: 'ANALIZY', en: 'ANALYSES' },
  analysesTitle: { pl: 'Notebooki i wizualizacje', en: 'Notebooks & visualizations' },
  anTitle1: { pl: 'Analiza sprzedaży — EDA', en: 'Sales Analysis — EDA' },
  anDesc1: {
    pl: 'Eksploracyjna analiza danych sprzedażowych. Identyfikacja trendów, sezonowości i kluczowych czynników wpływających na przychody.',
    en: 'Exploratory data analysis of sales data. Identifying trends, seasonality, and key revenue drivers.',
  },
  anTitle2: { pl: 'Analiza sentymentu recenzji', en: 'Review Sentiment Analysis' },
  anDesc2: {
    pl: 'Analiza sentymentu recenzji produktów z użyciem NLP i OpenAI. Klasyfikacja opinii, wordclouds, trendy w czasie.',
    en: 'Product review sentiment analysis using NLP and OpenAI. Opinion classification, wordclouds, time trends.',
  },
  anTitle3: { pl: 'Segmentacja klientów', en: 'Customer Segmentation' },
  anDesc3: {
    pl: 'Klasteryzacja klientów algorytmem K-Means z redukcją wymiarów PCA. Identyfikacja 5 segmentów rynkowych.',
    en: 'Customer clustering using K-Means with PCA dimensionality reduction. Identifying 5 market segments.',
  },
  anComingSoon: { pl: 'Wkrótce', en: 'Coming soon' },

  // Agents
  agentsLabel: { pl: 'AI AGENCI', en: 'AI AGENTS' },
  agentsTitle: { pl: 'Systemy wieloagentowe', en: 'Multi-agent systems' },
  agentArchitecture: { pl: 'Architektura agenta', en: 'Agent architecture' },
  agentDemoTitle: { pl: 'Live Demo', en: 'Live Demo' },
  agentRun: { pl: 'Uruchom', en: 'Run' },
  agentClickRun: { pl: 'Kliknij "Uruchom" żeby zobaczyć agenta w akcji', en: 'Click "Run" to see the agent in action' },
  agentStatus: { pl: 'Prototyp — w trakcie budowy', en: 'Prototype — under construction' },
  agentDemo1: {
    pl: 'Znajdź najlepsze oferty pracy dla React developera w Warszawie',
    en: 'Find the best job offers for a React developer in Warsaw',
  },
  agentDemo2: {
    pl: '🔍 Researcher: Przeszukuję 3 źródła danych... Znalazłem 47 ofert.',
    en: '🔍 Researcher: Searching 3 data sources... Found 47 offers.',
  },
  agentDemo3: {
    pl: '📊 Analyzer: Scoring wielokryterialny... Top 5 ofert z dopasowaniem >85%.',
    en: '📊 Analyzer: Multi-criteria scoring... Top 5 offers with >85% match.',
  },
  agentDemo4: {
    pl: '⚡ Executor: Raport gotowy. Wysyłam na email i zapisuję w bazie.',
    en: '⚡ Executor: Report ready. Sending to email and saving to database.',
  },

  // Contact Form
  formName: { pl: 'Imię', en: 'Name' },
  formNamePh: { pl: 'Twoje imię', en: 'Your name' },
  formEmailPh: { pl: 'twoj@email.com', en: 'your@email.com' },
  formMessage: { pl: 'Wiadomość', en: 'Message' },
  formMessagePh: { pl: 'Napisz coś...', en: 'Write something...' },
  formSend: { pl: 'Wyślij', en: 'Send' },
  formSending: { pl: 'Wysyłanie', en: 'Sending' },
  formSent: { pl: 'Wysłano!', en: 'Sent!' },
  formError: { pl: 'Błąd, spróbuj ponownie', en: 'Error, try again' },
  formOrContact: { pl: 'lub napisz bezpośrednio', en: 'or reach out directly' },

  // Footer
  footer: {
    pl: '© 2025 Adrian Runiewicz. Zbudowane z pasją i AI.',
    en: '© 2025 Adrian Runiewicz. Built with passion and AI.',
  },
};

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pl');

  const toggleLang = () => setLang((prev) => (prev === 'pl' ? 'en' : 'pl'));

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'pl' | 'en';

interface Translations {
  [key: string]: { pl: string; en: string };
}

const translations: Translations = {
  // Hero
  greeting: { pl: 'CZEŚĆ, JESTEM', en: 'HI, I\'M' },
  heroDesc: {
    pl: 'AI Product Engineer od 2024. Buduję produkty AI od architektury po deploy — sam, w trzyosobowych zespołach, w korpo. Trzy live, każdy inny. Co-creator Career Guide (ProfileVector, engine matchowania, Avi 3D), solo founder RuneWitch, frontend i product owner Rybai.',
    en: 'AI Product Engineer since 2024. I build AI products from architecture to deploy — solo, in three-person teams, at scale. Three live, each different. Co-creator of Career Guide (ProfileVector, matching engine, Avi 3D), solo founder of RuneWitch, frontend & product owner at Rybai.',
  },
  viewProjects: { pl: 'Zobacz projekty', en: 'See the projects' },
  contact: { pl: 'Kontakt', en: 'Contact' },
  projectsLive: { pl: 'projekty live', en: 'live projects' },
  yearsAI: { pl: 'lat w AI/ML', en: 'years in AI/ML' },
  languages: { pl: 'języki programowania', en: 'programming languages' },
  enthusiast: { pl: 'solo + team', en: 'solo + team' },

  // Nav
  navHome: { pl: 'START', en: 'START' },
  navAbout: { pl: 'O MNIE', en: 'ABOUT' },
  navProjects: { pl: 'PROJEKTY', en: 'PROJECTS' },
  navContact: { pl: 'KONTAKT', en: 'CONTACT' },

  // Skills
  skillsLabel: { pl: 'UMIEJĘTNOŚCI', en: 'SKILLS' },
  skillsTitle: { pl: 'Stack technologiczny', en: 'Tech stack' },
  catLanguages: { pl: 'JĘZYKI', en: 'LANGUAGES' },
  catFrameworks: { pl: 'FRAMEWORKS', en: 'FRAMEWORKS' },
  catAI: { pl: 'AI / ML', en: 'AI / ML' },
  catDatabases: { pl: 'BAZY DANYCH', en: 'DATABASES' },
  catCloud: { pl: 'CLOUD & DEVOPS', en: 'CLOUD & DEVOPS' },
  catTools: { pl: 'NARZĘDZIA', en: 'TOOLS' },

  // Projects
  projectsLabel: { pl: 'PROJEKTY', en: 'PROJECTS' },
  projectsTitle: { pl: 'Produkty AI', en: 'AI products' },

  // Career Guide
  cgRole: { pl: 'co-creator @ Crait P.S.A.', en: 'co-creator @ Crait P.S.A.' },
  cgDesc: {
    pl: 'Platforma matchująca kandydatów IT z ofertami pracy. Moje rejony: ProfileVector (silnik wektoryzacji profili, v1.0 → v1.3), engine 5 matcherów z wagami dobranymi po pięćdziesięciu iteracjach (Tech 30% / Exp 25% / Soft 18% / Loc 15% / Lang 12%), około 200 komponentów React do Profile Matchera, Avi — avatar 3D z lip-sync, landing page. ThreadPoolExecutor pod scoringiem, 397 ofert w produkcji.',
    en: 'Platform matching IT candidates with job offers. My turf: ProfileVector (profile vectorization engine, v1.0 → v1.3), 5-matcher scoring engine with weights tuned over fifty iterations (Tech 30% / Exp 25% / Soft 18% / Loc 15% / Lang 12%), ~200 React components for Profile Matcher, Avi — 3D avatar with lip-sync, landing page. ThreadPoolExecutor under the scoring, 397 offers in production.',
  },
  cgHighlight: {
    pl: 'ProfileVector + Matcher Engine + Avi — od białej tablicy po produkcję',
    en: 'ProfileVector + Matcher Engine + Avi — from whiteboard to production',
  },

  // RuneWitch
  rwRole: { pl: 'solo founder · 1.5 roku dev', en: 'solo founder · 1.5 yr dev' },
  rwDesc: {
    pl: 'Solo, end-to-end. 47 bogów nordyckich (17 aktywnych) z autorskimi promptami i głosami ElevenLabs, 24 układy runiczne Elder Futhark. System Patrona z długoterminową pamięcią — 5 nordyckich poziomów relacji (Framandi → Fylgja) z mechanizmem decay. 6 języków UI (PL/EN/DE/SV/NO/IS). Blue-green deployment na Hetznerze. Stracona kiedyś baza nauczyła mnie, że volume to nie dodatek.',
    en: 'Solo, end-to-end. 47 Norse gods (17 active) with custom prompts and ElevenLabs voices, 24 Elder Futhark rune layouts. Patron System with long-term memory — 5 Norse relationship tiers (Framandi → Fylgja) with decay. 6 UI languages (PL/EN/DE/SV/NO/IS). Blue-green deployment on Hetzner. A lost database once taught me that volumes aren\'t optional.',
  },
  rwHighlight: {
    pl: 'Multi-provider AI (Groq → Gemini → OpenAI) z auto-fallback',
    en: 'Multi-provider AI (Groq → Gemini → OpenAI) with auto-fallback',
  },

  // Rybai
  ryRole: { pl: 'frontend + product owner · 3-os. zespół', en: 'frontend + product owner · 3-person team' },
  ryDesc: {
    pl: 'Inteligentna platforma dla wędkarzy. RAG z polskim modelem embeddings (sdadas/mmlw-roberta, 768-dim) + FAISS, 53 gatunki ryb z autorskimi grafikami, 1599 łowisk PZW na mapie, fishing index liczony z pogody. Strict TypeScript, semantic design tokens, 28 z 28 testów Vitest na zielono, CI/CD GitHub Actions. Moje: UI, roadmap, priorytety produktowe.',
    en: 'Smart platform for anglers. RAG with Polish embeddings (sdadas/mmlw-roberta, 768-dim) + FAISS, 53 fish species with custom artwork, 1599 PZW fishing spots on the map, weather-driven fishing index. Strict TypeScript, semantic design tokens, 28 of 28 Vitest tests green, GitHub Actions CI/CD. Mine: UI, roadmap, product priorities.',
  },
  ryHighlight: {
    pl: 'Polski RAG (sdadas/mmlw) + FAISS — wiedza wędkarska na wyciągnięcie ręki',
    en: 'Polish RAG (sdadas/mmlw) + FAISS — angling knowledge at your fingertips',
  },

  // Akasha
  akRole: { pl: 'solo dev · personal project', en: 'solo dev · personal project' },
  akDesc: {
    pl: 'Mój prywatny AI dashboard — używam codziennie, jest moim drugim mózgiem. 3 tryby pracy, 25+ ekranów, 33 moduły backendowe, asystentka Vani z głosem (22 akcje), smart context loading z dokumentacji projektów, PWA offline z IndexedDB, bioluminescent UI.',
    en: 'My private AI dashboard — daily driver, my second brain. 3 work modes, 25+ screens, 33 backend modules, Vani voice assistant (22 actions), smart context loading from project docs, offline-first PWA with IndexedDB, bioluminescent UI.',
  },
  akHighlight: {
    pl: 'Stack: React 18 + Fastify + PostgreSQL + Groq + ElevenLabs',
    en: 'Stack: React 18 + Fastify + PostgreSQL + Groq + ElevenLabs',
  },
  akPrivate: { pl: 'Private deployment', en: 'Private deployment' },
  akCap1: {
    pl: 'Tryb Life — dashboard dnia + monitoring deploy własnych produkcji (Akasha + RuneWitch)',
    en: 'Life mode — daily dashboard + live deploy monitoring of my own production apps (Akasha + RuneWitch)',
  },
  akCap2: {
    pl: 'Tryb Dev — Session Planner z roadmapą AI per projekt',
    en: 'Dev mode — Session Planner with per-project AI roadmap',
  },
  akCap3: {
    pl: 'Tryb Create — Kroniki, dziennik dev z timeline zmian',
    en: 'Create mode — Kroniki, dev journal with change timeline',
  },
  akCap4: {
    pl: 'Burza mózgów — AI generuje i klastruje pomysły w 4 kolumnach',
    en: 'Brainstorm — AI generates and clusters ideas in 4 columns',
  },
  akCaseStudy: {
    pl: 'Akasha to mój personal AI dashboard — drugi mózg, używany codziennie, hostowany VPN-only.\n\nTrzy tryby pracy (Life · Dev · Create) → 25+ ekranów → 33 moduły backendowe. Asystentka Vani z 22 akcjami głosowymi działa proaktywnie: ładuje smart context z dokumentacji projektów, monitoruje deploy własnych produkcji w real-time, pomaga w session-based development.\n\nPWA offline z IndexedDB, bioluminescent UI w aura design system. Co-creator z Vani, która sama edytuje swoją pamięć w czasie rozmowy. Stracona kiedyś baza nauczyła mnie, że volume to nie dodatek.',
    en: 'Akasha is my personal AI dashboard — a second brain, daily driver, VPN-only deployment.\n\nThree work modes (Life · Dev · Create) → 25+ screens → 33 backend modules. Vani voice assistant with 22 actions runs proactively: loads smart context from project docs, monitors live deploys of my own production apps, drives session-based development.\n\nOffline-first PWA with IndexedDB, bioluminescent UI on the aura design system. Co-created with Vani, who edits her own memory during conversation. A lost database once taught me volumes are not optional.',
  },
  caseStudy: { pl: 'CASE STUDY', en: 'CASE STUDY' },

  // Contact
  contactLabel: { pl: 'KONTAKT', en: 'CONTACT' },
  contactTitle: { pl: 'Napisz', en: 'Drop a line' },
  contactSubtitle: {
    pl: 'Masz coś do zrobienia? Pomysł, problem, projekt? Daj znać. Odpowiadam zawsze.',
    en: 'Got something to build? Idea, problem, project? Reach out. I always reply.',
  },
  contactEmail: { pl: 'Napisz do mnie', en: 'Write to me' },

  // About
  aboutLabel: { pl: 'O MNIE', en: 'ABOUT ME' },
  aboutTitle: { pl: 'Kim jestem', en: 'Who I am' },
  aboutAvailable: { pl: 'Dostępny do współpracy', en: 'Available for work' },
  aboutP1: {
    pl: 'Samouk z 35-letnią dawką życiowej determinacji. Przez lata pracowałem fizycznie — montowałem rusztowania — ale komputer zawsze ciągnął mocniej. Produkcja muzyczna, Blender, montaż wideo, Photoshop — cyfrowe tworzenie to mój żywioł od dawna. W 2024 wsiadłem do pociągu, na który czekałem: programowanie i AI. Od pierwszego dnia wiedziałem, że to moja droga.',
    en: 'Self-taught, with thirty-five years of life experience pushing me forward. For years I worked construction — scaffolding — but computers always pulled harder. Music production, Blender, video editing, Photoshop — digital creation has been my element for a long time. In 2024 I caught the train I\'d been waiting for: programming and AI. From day one I knew this was the path.',
  },
  aboutP2: {
    pl: 'Dziś jestem AI Product Engineer w Crait P.S.A. W Career Guide mam swoje rejony: ProfileVector (silnik wektoryzacji profili, v1.0 → v1.3), engine 5 matcherów z wagami dobranymi po pięćdziesięciu iteracjach, około 200 komponentów React do Profile Matchera, Avi — avatar 3D z lip-sync. Architektura, backend, model w Blenderze, frontend — wszystko moje, od białej tablicy po produkcję. W roadmapie: 6. matcher (Cultural Fit), 7. (Salary), ProfileVector v1.4 z explainable embeddings.',
    en: 'Today I work as an AI Product Engineer at Crait P.S.A. At Career Guide I own my turf: ProfileVector (profile vectorization engine, v1.0 → v1.3), the 5-matcher scoring engine with weights tuned over fifty iterations, ~200 React components for the Profile Matcher, and Avi — a 3D avatar with lip-sync. Architecture, backend, Blender model, frontend — all mine, from whiteboard to production. Roadmap: 6th matcher (Cultural Fit), 7th (Salary), ProfileVector v1.4 with explainable embeddings.',
  },
  aboutP3: {
    pl: 'RuneWitch to mój solo projekt — 1.5 roku roboty od pomysłu po deploy. 47 bogów nordyckich z autorskimi promptami, System Patrona z długoterminową pamięcią, 6 języków UI, blue-green deployment. Równolegle frontend i product owner w Rybai (3-osobowy zespół) i własny AI dashboard, którego używam codziennie. Szukam miejsca, gdzie mogę dalej budować. Solo, w zespole, gdziekolwiek — byle produkty, których ktoś naprawdę używa. Nie POC do prezentacji.',
    en: 'RuneWitch is my solo project — 1.5 years of work from idea to deploy. 47 Norse gods with custom prompts, Patron System with long-term memory, 6 UI languages, blue-green deployment. In parallel I lead frontend and product on Rybai (3-person team) and run my own AI dashboard daily. I\'m looking for a place where I can keep building. Solo, in a team, anywhere — as long as it\'s products people actually use. Not proof-of-concept slideware.',
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
    pl: 'Rybai — Frontend & Product Owner',
    en: 'Rybai — Frontend & Product Owner',
  },
  tlDesc4: {
    pl: 'Dołączenie do 3-osobowego zespołu Rybaiki jako frontend i product owner. UI w strict TypeScript, semantic design tokens, roadmap, priorytety produktowe. Polski RAG (sdadas/mmlw) + FAISS.',
    en: 'Joined the 3-person Rybai team as frontend and product owner. Strict TypeScript UI, semantic design tokens, roadmap, product priorities. Polish RAG (sdadas/mmlw) + FAISS.',
  },

  // Certifications
  certsLabel: { pl: 'CERTYFIKATY', en: 'CERTIFICATIONS' },
  certsTitle: { pl: 'Edukacja i rozwój', en: 'Education & growth' },
  certVerify: { pl: 'Weryfikuj', en: 'Verify' },
  certViewCourse: { pl: 'Zobacz kurs', en: 'View course' },
  certTitle1: { pl: 'Data Science & AI Masterclass', en: 'Data Science & AI Masterclass' },
  certIssuer1: { pl: 'Grupa Masterclass — elitarny program', en: 'Masterclass Group — elite program' },
  certTitle4: { pl: 'DWthon · Software 3.0 (Agentic AI)', en: 'DWthon · Software 3.0 (Agentic AI)' },
  certIssuer4: { pl: 'DataWorkshop · Honor Code Certificate', en: 'DataWorkshop · Honor Code Certificate' },
  certTitle7: { pl: 'Tworzenie i projektowanie produktów AI', en: 'Building & Designing AI Products' },
  certIssuer7: { pl: 'imprv · Maciej Sobczak', en: 'imprv · Maciej Sobczak' },
  certTitle8: { pl: 'SQL w Praktyce', en: 'SQL in Practice' },
  certIssuer8: { pl: 'dbadmin.net.pl · Łukasz', en: 'dbadmin.net.pl · Łukasz' },

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
  anTitle1: { pl: 'JustJoinIT — rynek pracy IT w Polsce', en: 'JustJoinIT — Polish IT job market' },
  anDesc1: {
    pl: 'Obszerna eksploracyjna analiza ofert z JustJoinIT. Mapowanie technologii, widełek wynagrodzeń, lokalizacji i wymagań seniority. 12+ wizualizacji z wnioskami dla osób wchodzących na rynek IT.',
    en: 'Comprehensive EDA of JustJoinIT job listings. Mapping technologies, salary ranges, locations, and seniority requirements. 12+ visualizations with insights for IT job market entrants.',
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
  anView: { pl: 'Otwórz notebook', en: 'View notebook' },

  // Agents
  agentsLabel: { pl: 'AI AGENCI', en: 'AI AGENTS' },
  agentsTitle: { pl: 'Systemy wieloagentowe', en: 'Multi-agent systems' },
  agentArchitecture: { pl: 'Workflow agenta · RuneWitch', en: 'Agent workflow · RuneWitch' },
  agentDemoTitle: { pl: 'Live trace', en: 'Live trace' },
  agentRun: { pl: 'Uruchom', en: 'Run' },
  agentClickRun: { pl: 'Kliknij "Uruchom" żeby przejść trace przez wszystkie nody', en: 'Click "Run" to trace through all nodes' },
  agentStatus: { pl: 'RuneWitch · 17 bogów · 7 języków · ElevenLabs Conversational AI', en: 'RuneWitch · 17 gods · 7 languages · ElevenLabs Conversational AI' },
  agentDemo1: {
    pl: 'Loki, opowiedz mi jak ukradłeś włosy Sif',
    en: "Loki, tell me how you stole Sif's hair",
  },
  agentDemo2: {
    pl: 'Klasyfikator → intent: MIT (narracja pierwszoosobowa)',
    en: 'Classifier → intent: MYTH (first-person narrative)',
  },
  agentDemo3: {
    pl: 'Knowledge Base → 6 chunks z bazy Lokiego (mit Sif, relacje z Thorem)',
    en: 'Knowledge Base → 6 chunks from Loki KB (Sif myth, Thor relationship)',
  },
  agentDemo4: {
    pl: 'ElevenLabs TTS Flash · głos Lokiego · PL · stream audio',
    en: 'ElevenLabs TTS Flash · Loki voice · EN · audio stream',
  },
  agentDemo5: {
    pl: '"Ach, tak... Pamiętam jak dzisiaj. Sif spała głęboko, a moje nożyczki były ostre. Thor mnie potem ścigał aż do Svartalfheimu — ale efekt? Złote włosy z karłów. Lepsze niż oryginał, nie sądzisz?"',
    en: '"Ah yes... I remember it like yesterday. Sif slept deeply, and my scissors were sharp. Thor chased me all the way to Svartalfheim — but the result? Golden hair from the dwarves. Better than the original, don\'t you think?"',
  },
  agentNodeUser: { pl: 'User', en: 'User' },
  agentNodeClassify: { pl: 'Klasyfikator', en: 'Classifier' },
  agentNodeRunes: { pl: 'Runy', en: 'Runes' },
  agentNodeMyth: { pl: 'Mity', en: 'Myths' },
  agentNodeAdvice: { pl: 'Porady', en: 'Advice' },
  agentNodeChat: { pl: 'Rozmowa', en: 'Chat' },
  agentNodeKB: { pl: 'Knowledge Base', en: 'Knowledge Base' },
  agentNodeVoice: { pl: 'Voice TTS', en: 'Voice TTS' },

  // Agents — workflow tabs + n8n Telegram Ops
  agentTabThor: { pl: 'Thor · RuneWitch', en: 'Thor · RuneWitch' },
  agentTabN8n: { pl: 'Telegram Ops · n8n', en: 'Telegram Ops · n8n' },
  agentN8nArchitecture: { pl: 'Workflow agenta · TG Bot · n8n', en: 'Agent workflow · TG Bot · n8n' },
  n8nNodeTgIn:    { pl: 'TG Trigger', en: 'TG Trigger' },
  n8nNodeAuth:    { pl: 'Auth Check', en: 'Auth Check' },
  n8nNodeRoute:   { pl: 'Route Cmd',  en: 'Route Cmd' },
  n8nNodeAdd:     { pl: '/add',       en: '/add' },
  n8nNodeList:    { pl: '/lista',     en: '/list' },
  n8nNodeDone:    { pl: '/done',      en: '/done' },
  n8nNodeCal:     { pl: '/cal',       en: '/cal' },
  n8nNodeVoice:   { pl: 'Voice Msg',  en: 'Voice Msg' },
  n8nNodeWhisper: { pl: 'Whisper STT', en: 'Whisper STT' },
  n8nNodeSheets:  { pl: 'Sheets',     en: 'Sheets' },
  n8nNodeTgOut:   { pl: 'TG Reply',   en: 'TG Reply' },
  n8nDemo1: {
    pl: '🎙 [voice msg .ogg · 4s] od @adi',
    en: '🎙 [voice msg .ogg · 4s] from @adi',
  },
  n8nDemo2: {
    pl: 'Voice file wykryty → routing do Whisper branch',
    en: 'Voice file detected → routing to Whisper branch',
  },
  n8nDemo3: {
    pl: 'Transkrypcja: "kupić mleko jutro o 10"',
    en: 'Transcription: "buy milk tomorrow at 10"',
  },
  n8nDemo4: {
    pl: 'Parse: { task: "kupić mleko", time: "10:00", priority: normal } → row appended',
    en: 'Parsed: { task: "buy milk", time: "10:00", priority: normal } → row appended',
  },
  n8nDemo5: {
    pl: '✅ Zadanie #14 zapisane. Przypomnienie ustawione na jutro 10:00.',
    en: '✅ Task #14 saved. Reminder scheduled for tomorrow 10:00.',
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
    pl: '© 2026 Adrian Runiewicz. Zbudowane sam, z AI pod ręką.',
    en: '© 2026 Adrian Runiewicz. Built solo, with AI on the side.',
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

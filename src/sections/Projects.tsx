import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import {
  FiArrowRight,
  FiGithub,
  FiLock,
  FiChevronLeft,
  FiChevronRight,
  FiRotateCw,
} from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

interface ProjectData {
  id: string;
  title: string;
  category: string;
  roleKey: string;
  descKey: string;
  highlightKey?: string;
  tech: string[];
  url?: string;
  github?: string;
  privateLabelKey?: string;
  aura: Aura;
  image?: string;
}

const projects: ProjectData[] = [
  {
    id: 'career-guide',
    title: 'Career Guide',
    category: 'AI MATCHING PLATFORM',
    roleKey: 'cgRole',
    descKey: 'cgDesc',
    highlightKey: 'cgHighlight',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind', 'Blender', 'Supabase'],
    url: 'https://careerguide.pl',
    aura: 'vital',
    image: '/projects/career-guide.png',
  },
  {
    id: 'runewitch',
    title: 'RuneWitch',
    category: 'AI × NORSE MYTHOLOGY',
    roleKey: 'rwRole',
    descKey: 'rwDesc',
    highlightKey: 'rwHighlight',
    tech: ['React 19', 'FastAPI', 'SQLite', 'Groq', 'Gemini', 'OpenAI', 'ElevenLabs', 'Replicate', 'Docker'],
    url: 'https://runewitch.app',
    aura: 'aether',
    image: '/projects/runewitch.png',
  },
  {
    id: 'rybaika',
    title: 'Rybaika',
    category: 'FISHING AI · RAG · GEO',
    roleKey: 'ryRole',
    descKey: 'ryDesc',
    highlightKey: 'ryHighlight',
    tech: ['React', 'TypeScript (strict)', 'Vite', 'FastAPI', 'PostgreSQL', 'Redis', 'FAISS', 'GPT-4o-mini', 'Vitest'],
    aura: 'flow',
    image: '/projects/rybaika.png',
  },
  {
    id: 'akasha',
    title: 'Akasha',
    category: 'PERSONAL AI DASHBOARD',
    roleKey: 'akRole',
    descKey: 'akDesc',
    highlightKey: 'akHighlight',
    tech: ['React 18', 'TypeScript', 'Fastify', 'Drizzle ORM', 'PostgreSQL', 'Groq', 'ElevenLabs', 'PWA'],
    privateLabelKey: 'akPrivate',
    aura: 'aether',
    image: '/projects/akasha.png',
  },
];

const auraStyles: Record<Aura, {
  dot: string;
  role: string;
  highlight: string;
  techHover: string;
  border: string;
  blob: string;
  glow: string;
  link: string;
  shadowVar: string;
  flipBtn: string;
  dotActive: string;
}> = {
  aether: {
    dot: 'bg-aura-aether-mid shadow-[0_0_10px_rgb(99_102_241/0.6)]',
    role: 'text-aura-aether-mid bg-aura-aether-mid/8 border-aura-aether-mid/25',
    highlight: 'text-aura-aether-start bg-aura-aether-start/8 border-aura-aether-mid/20',
    techHover: 'hover:border-aura-aether-mid/50 hover:bg-aura-aether-mid/5 hover:text-aura-aether-start',
    border: 'hover:border-aura-aether-mid/40',
    blob: 'bg-aura-aether-mid/15 group-hover:bg-aura-aether-mid/30',
    glow: 'group-hover:shadow-[0_0_50px_-10px_rgb(99_102_241/0.45),0_0_100px_-30px_rgb(217_70_239/0.25)]',
    link: 'text-aura-aether-start hover:text-aura-aether-mid hover:bg-aura-aether-mid/10',
    shadowVar: '0 0 30px -10px rgb(99 102 241 / 0.2)',
    flipBtn: 'border-aura-aether-mid/40 text-aura-aether-mid hover:bg-aura-aether-mid/10 hover:border-aura-aether-mid/70',
    dotActive: 'bg-aura-aether-mid',
  },
  vital: {
    dot: 'bg-aura-vital-mid shadow-[0_0_10px_rgb(232_121_249/0.6)]',
    role: 'text-aura-vital-mid bg-aura-vital-mid/8 border-aura-vital-mid/25',
    highlight: 'text-aura-vital-start bg-aura-vital-start/8 border-aura-vital-mid/20',
    techHover: 'hover:border-aura-vital-mid/50 hover:bg-aura-vital-mid/5 hover:text-aura-vital-start',
    border: 'hover:border-aura-vital-mid/40',
    blob: 'bg-aura-vital-mid/15 group-hover:bg-aura-vital-mid/30',
    glow: 'group-hover:shadow-[0_0_50px_-10px_rgb(232_121_249/0.45),0_0_100px_-30px_rgb(168_85_247/0.25)]',
    link: 'text-aura-vital-start hover:text-aura-vital-mid hover:bg-aura-vital-mid/10',
    shadowVar: '0 0 30px -10px rgb(232 121 249 / 0.2)',
    flipBtn: 'border-aura-vital-mid/40 text-aura-vital-mid hover:bg-aura-vital-mid/10 hover:border-aura-vital-mid/70',
    dotActive: 'bg-aura-vital-mid',
  },
  flow: {
    dot: 'bg-aura-flow-mid shadow-[0_0_10px_rgb(244_114_182/0.6)]',
    role: 'text-aura-flow-mid bg-aura-flow-mid/8 border-aura-flow-mid/25',
    highlight: 'text-aura-flow-start bg-aura-flow-start/8 border-aura-flow-mid/20',
    techHover: 'hover:border-aura-flow-mid/50 hover:bg-aura-flow-mid/5 hover:text-aura-flow-start',
    border: 'hover:border-aura-flow-mid/40',
    blob: 'bg-aura-flow-mid/15 group-hover:bg-aura-flow-mid/30',
    glow: 'group-hover:shadow-[0_0_50px_-10px_rgb(244_114_182/0.45),0_0_100px_-30px_rgb(52_211_153/0.25)]',
    link: 'text-aura-flow-start hover:text-aura-flow-mid hover:bg-aura-flow-mid/10',
    shadowVar: '0 0 30px -10px rgb(244 114 182 / 0.2)',
    flipBtn: 'border-aura-flow-mid/40 text-aura-flow-mid hover:bg-aura-flow-mid/10 hover:border-aura-flow-mid/70',
    dotActive: 'bg-aura-flow-mid',
  },
};

const auraGradients: Record<Aura, string> = {
  aether: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #d946ef 100%)',
  vital: 'linear-gradient(135deg, #fb7185 0%, #e879f9 50%, #a855f7 100%)',
  flow: 'linear-gradient(135deg, #34d399 0%, #f472b6 50%, #fbbf24 100%)',
};

// Carousel geometry — coverflow stack: aktywna karta z przodu, sąsiednie wystają z boku częściowo schowane.
const CARD_W = 380;
const CARD_H = 456;          // aspect 5:6 → 380 * 6/5
const SHIFT = 170;           // translateX między sąsiadami

function ProjectImage({ project }: { project: ProjectData }) {
  const [errored, setErrored] = useState(false);
  const showImage = project.image && !errored;
  return (
    <div className="relative aspect-[21/9] -mx-5 -mt-5 mb-3 overflow-hidden border-b border-border-subtle">
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: auraGradients[project.aura] }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)`,
        }}
      />
      {!showImage && (
        <div className="absolute inset-0 flex items-end p-4">
          <span className="font-display text-2xl font-semibold text-text-primary/90">
            {project.title}
          </span>
        </div>
      )}
      {showImage && (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={() => setErrored(true)}
          className="relative w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-surface/95 to-transparent pointer-events-none" />
    </div>
  );
}

interface FaceProps {
  project: ProjectData;
  s: typeof auraStyles[Aura];
  t: (key: string) => string;
  onFlip: () => void;
}

function FrontFace({ project, s, t, onFlip }: FaceProps) {
  return (
    <div
      className={`absolute inset-0 [backface-visibility:hidden] bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-2xl p-5 overflow-hidden flex flex-col`}
      style={{ boxShadow: s.shadowVar }}
    >
      <div
        className={`absolute -right-12 -top-12 w-40 h-40 blur-3xl rounded-full pointer-events-none ${s.blob}`}
      />
      <div className="relative flex flex-col h-full">
        <ProjectImage project={project} />

        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {project.category}
          </span>
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
        </div>

        <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-1.5 leading-tight">
          {project.title}
        </h3>

        <span
          className={`inline-block self-start font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md border mb-2.5 ${s.role}`}
        >
          {t(project.roleKey)}
        </span>

        <p className="text-text-secondary text-xs md:text-sm leading-relaxed line-clamp-3 mb-3">
          {t(project.descKey)}
        </p>

        <button
          type="button"
          onClick={onFlip}
          className={`mt-auto self-start inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-md border transition-all duration-200 ${s.flipBtn}`}
          aria-label="Pokaż szczegóły"
        >
          <FiRotateCw />
          Szczegóły
        </button>
      </div>
    </div>
  );
}

function BackFace({ project, s, t, onFlip }: FaceProps) {
  return (
    <div
      className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-2xl p-5 overflow-hidden flex flex-col`}
      style={{ boxShadow: s.shadowVar }}
    >
      <div
        className={`absolute -left-12 -top-12 w-40 h-40 blur-3xl rounded-full pointer-events-none ${s.blob}`}
      />
      <div className="relative flex flex-col h-full gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary leading-tight">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onFlip}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md border transition-all duration-200 ${s.flipBtn}`}
            aria-label="Wróć"
          >
            <FiRotateCw className="rotate-180" />
          </button>
        </div>

        {project.highlightKey && (
          <div
            className={`px-3 py-2 rounded-lg border font-mono text-[11px] leading-relaxed ${s.highlight}`}
          >
            {t(project.highlightKey)}
          </div>
        )}

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-1.5">
            STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md border border-border-subtle bg-bg-elevated/40 font-mono text-[10px] text-text-secondary transition-colors duration-200 ${s.techHover}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 ${s.link}`}
            >
              OPEN APP
              <FiArrowRight className="transition-transform group-hover/link:translate-x-0.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all duration-200 ${s.link}`}
            >
              <FiGithub /> CODE
            </a>
          )}
          {project.privateLabelKey && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md border border-dashed border-border-subtle text-text-muted">
              <FiLock /> {t(project.privateLabelKey)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FlipCard({ project, t, isActive = true }: { project: ProjectData; t: (key: string) => string; isActive?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const s = auraStyles[project.aura];

  // Reset flip when card leaves the carousel slot (navigation between projects).
  useEffect(() => {
    if (!isActive && flipped) setFlipped(false);
  }, [isActive, flipped]);

  return (
    <div className="w-full max-w-[380px] mx-auto" style={{ perspective: '1400px' }}>
      <div
        className="relative w-full transition-transform duration-700"
        style={{
          aspectRatio: '5 / 6',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <FrontFace project={project} s={s} t={t} onFlip={() => setFlipped(true)} />
        <BackFace project={project} s={s} t={t} onFlip={() => setFlipped(false)} />
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [currentIdx, setCurrentIdx] = useState(0);

  const goPrev = useCallback(() => {
    setCurrentIdx((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIdx((i) => (i + 1) % projects.length);
  }, []);

  return (
    <section
      id="projects"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 md:gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-text-muted mb-3 md:mb-4">
            {t('projectsLabel')}
          </span>
          <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="aura-text-vital">{t('projectsTitle')}</span>
          </h2>
        </motion.div>

        {/* Mobile: pionowy stack — wszystkie projekty pełna karta, naturalna szerokość */}
        <div className="md:hidden flex flex-col gap-6 w-full max-w-[380px] mx-auto pt-2">
          {projects.map((project) => (
            <FlipCard key={project.id} project={project} t={t} />
          ))}
        </div>

        {/* Desktop (md+): Coverflow karuzela — aktywna karta z przodu, sąsiednie z boku częściowo schowane */}
        <div
          className="hidden md:block relative w-full mx-auto"
          style={{ maxWidth: `${CARD_W + 4 * SHIFT}px` }}
        >
          <div
            className="relative w-full mx-auto"
            style={{ height: `${CARD_H}px` }}
          >
            {projects.map((project, i) => {
              // Symetryczny offset (-half ... +half) liczony cyklicznie wokół currentIdx
              const half = Math.floor(projects.length / 2);
              let offset = i - currentIdx;
              if (offset > half) offset -= projects.length;
              if (offset < -half) offset += projects.length;

              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const translateX = offset * SHIFT;
              const scale = isActive ? 1 : absOffset === 1 ? 0.85 : 0.72;
              const opacity = isActive ? 1 : absOffset === 1 ? 0.7 : 0.4;
              const zIndex = 100 - absOffset * 10;

              return (
                <div
                  key={project.id}
                  className="absolute top-0 left-1/2 transition-all duration-500 ease-out"
                  style={{
                    width: `${CARD_W}px`,
                    transform: `translateX(calc(-50% + ${translateX}px)) scale(${scale})`,
                    opacity,
                    zIndex,
                    filter: isActive ? 'none' : 'saturate(0.7)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  aria-hidden={!isActive}
                >
                  <FlipCard project={project} t={t} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Prev / Next — pulsujące, dobrze widoczne, zastąpiły kropki */}
          {/* Prev/Next przylegają do active karty (calc 50% - card_half - button - gap) */}
          <motion.button
            type="button"
            onClick={goPrev}
            aria-label="Poprzedni projekt"
            animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0 0 rgba(232,121,249,0)', '0 0 0 12px rgba(232,121,249,0.15)', '0 0 0 0 rgba(232,121,249,0)'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 -translate-y-1/2 z-[200] inline-flex items-center justify-center w-14 h-14 rounded-full bg-bg-surface/85 backdrop-blur-sm border-2 border-aura-vital-mid/70 text-aura-vital-mid"
            style={{ left: `calc(50% - ${CARD_W / 2 + 56 + 12}px)` }}
          >
            <FiChevronLeft className="text-2xl" />
          </motion.button>
          <motion.button
            type="button"
            onClick={goNext}
            aria-label="Następny projekt"
            animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0 0 rgba(232,121,249,0)', '0 0 0 12px rgba(232,121,249,0.15)', '0 0 0 0 rgba(232,121,249,0)'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 -translate-y-1/2 z-[200] inline-flex items-center justify-center w-14 h-14 rounded-full bg-bg-surface/85 backdrop-blur-sm border-2 border-aura-vital-mid/70 text-aura-vital-mid"
            style={{ right: `calc(50% - ${CARD_W / 2 + 56 + 12}px)` }}
          >
            <FiChevronRight className="text-2xl" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

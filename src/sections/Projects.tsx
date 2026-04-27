import { motion } from 'framer-motion';
import { FiArrowRight, FiGithub, FiLock } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

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
  },
};

export default function Projects() {
  const { t } = useLang();

  return (
    <section
      id="projects"
      className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
          {t('projectsLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          <span className="aura-text-vital">{t('projectsTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} t={t} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  t,
}: {
  project: ProjectData;
  index: number;
  t: (key: string) => string;
}) {
  const s = auraStyles[project.aura];

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-7 transition-all duration-500 ${s.border} ${s.glow}`}
      style={{ boxShadow: s.shadowVar }}
    >
      {/* Aura blob in corner */}
      <div
        className={`absolute -right-12 -top-12 w-40 h-40 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${s.blob}`}
      />

      <div className="relative flex flex-col h-full">
        {/* Category + status dot */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">
            {project.category}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          {project.title}
        </h3>

        {/* Role badge */}
        <span
          className={`inline-block self-start font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border mb-4 ${s.role}`}
        >
          {t(project.roleKey)}
        </span>

        {/* Description */}
        <p className="text-text-secondary text-sm md:text-[0.95rem] leading-relaxed mb-4">
          {t(project.descKey)}
        </p>

        {/* Highlight */}
        {project.highlightKey && (
          <div
            className={`px-3 py-2 rounded-lg border font-mono text-xs mb-4 ${s.highlight}`}
          >
            {t(project.highlightKey)}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-2.5 py-1 rounded-md border border-border-subtle bg-bg-elevated/40 font-mono text-[11px] text-text-secondary transition-colors duration-200 ${s.techHover}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
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
    </motion.article>
  );
}

import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';
import {
  SiPython, SiTypescript, SiJavascript,
  SiReact, SiNextdotjs, SiFastapi, SiStreamlit,
  SiOpenai, SiDocker, SiNginx, SiGithubactions,
  SiPostgresql, SiSqlite, SiSupabase,
  SiGit, SiVite, SiFramer, SiPandas, SiHetzner,
} from 'react-icons/si';
import { FiDatabase, FiCpu, FiCloud, FiTool, FiCode } from 'react-icons/fi';
import type { ReactNode } from 'react';

type Aura = 'aether' | 'vital' | 'flow';

interface SkillItem {
  name: string;
  icon: ReactNode;
}

interface SkillGroup {
  key: string;
  headerIcon: ReactNode;
  aura: Aura;
  items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    key: 'catLanguages',
    headerIcon: <FiCode />,
    aura: 'aether',
    items: [
      { name: 'Python', icon: <SiPython /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'SQL', icon: <FiDatabase /> },
    ],
  },
  {
    key: 'catFrameworks',
    headerIcon: <SiReact />,
    aura: 'vital',
    items: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'Streamlit', icon: <SiStreamlit /> },
    ],
  },
  {
    key: 'catAI',
    headerIcon: <FiCpu />,
    aura: 'flow',
    items: [
      { name: 'OpenAI', icon: <SiOpenai /> },
      { name: 'Groq', icon: <FiCpu /> },
      { name: 'Gemini', icon: <FiCpu /> },
      { name: 'ElevenLabs', icon: <FiCpu /> },
      { name: 'Langfuse', icon: <FiCpu /> },
      { name: 'Embeddings', icon: <FiCpu /> },
    ],
  },
  {
    key: 'catDatabases',
    headerIcon: <FiDatabase />,
    aura: 'aether',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'SQLite', icon: <SiSqlite /> },
      { name: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    key: 'catCloud',
    headerIcon: <FiCloud />,
    aura: 'vital',
    items: [
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Nginx', icon: <SiNginx /> },
      { name: 'Render', icon: <FiCloud /> },
      { name: 'Hetzner', icon: <SiHetzner /> },
      { name: 'GitHub Actions', icon: <SiGithubactions /> },
    ],
  },
  {
    key: 'catTools',
    headerIcon: <FiTool />,
    aura: 'flow',
    items: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Vite', icon: <SiVite /> },
      { name: 'Framer Motion', icon: <SiFramer /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'Alembic', icon: <FiTool /> },
    ],
  },
];

const auraStyles: Record<Aura, {
  iconColor: string;
  blob: string;
  border: string;
  shadow: string;
  tagHover: string;
}> = {
  aether: {
    iconColor: 'text-aura-aether-mid',
    blob: 'bg-aura-aether-mid/20 group-hover:bg-aura-aether-mid/35',
    border: 'hover:border-aura-aether-mid/40',
    shadow: '0 0 25px -10px rgb(99 102 241 / 0.2)',
    tagHover: 'hover:border-aura-aether-mid/50 hover:text-aura-aether-start',
  },
  vital: {
    iconColor: 'text-aura-vital-mid',
    blob: 'bg-aura-vital-mid/20 group-hover:bg-aura-vital-mid/35',
    border: 'hover:border-aura-vital-mid/40',
    shadow: '0 0 25px -10px rgb(232 121 249 / 0.2)',
    tagHover: 'hover:border-aura-vital-mid/50 hover:text-aura-vital-start',
  },
  flow: {
    iconColor: 'text-aura-flow-mid',
    blob: 'bg-aura-flow-mid/20 group-hover:bg-aura-flow-mid/35',
    border: 'hover:border-aura-flow-mid/40',
    shadow: '0 0 25px -10px rgb(244 114 182 / 0.2)',
    tagHover: 'hover:border-aura-flow-mid/50 hover:text-aura-flow-start',
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const { t } = useLang();

  return (
    <section
      id="skills"
      className="relative px-8 md:px-20 lg:px-28 xl:px-36 py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
          {t('skillsLabel')}
        </span>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {skillGroups.map((group) => {
          const s = auraStyles[group.aura];
          return (
            <motion.div
              key={group.key}
              variants={itemVariants}
              className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-3xl p-5 md:p-6 transition-all duration-500 ${s.border}`}
              style={{ boxShadow: s.shadow }}
            >
              <div
                className={`absolute -right-8 -top-8 w-28 h-28 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${s.blob}`}
              />

              <div className="relative">
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-4">
                  <span className={`text-base ${s.iconColor}`}>{group.headerIcon}</span>
                  {t(group.key)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-bg-elevated/40 text-text-secondary font-mono text-xs transition-all duration-200 ${s.tagHover}`}
                    >
                      <span className={`text-sm ${s.iconColor}`}>{skill.icon}</span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

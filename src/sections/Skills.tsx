import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';
import {
  SiPython, SiTypescript, SiJavascript,
  SiReact, SiNextdotjs, SiFastapi, SiStreamlit,
  SiOpenai, SiDocker, SiNginx, SiGithubactions,
  SiPostgresql, SiSqlite, SiSupabase,
  SiGit, SiVite, SiFramer, SiPandas, SiHetzner,
} from 'react-icons/si';
import { FiDatabase, FiCpu, FiCloud, FiTool } from 'react-icons/fi';
import type { ReactNode } from 'react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface SkillItem {
  name: string;
  icon: ReactNode;
}

interface SkillGroup {
  key: string;
  headerIcon: ReactNode;
  items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    key: 'catLanguages',
    headerIcon: <FiCpu />,
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
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'SQLite', icon: <SiSqlite /> },
      { name: 'Supabase', icon: <SiSupabase /> },
    ],
  },
  {
    key: 'catCloud',
    headerIcon: <FiCloud />,
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
    items: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'Vite', icon: <SiVite /> },
      { name: 'Framer Motion', icon: <SiFramer /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'Alembic', icon: <FiTool /> },
    ],
  },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section id="skills" className="skills">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('skillsLabel')}</span>
      </motion.div>

      <motion.div
        className="skills__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.key}
            className="skills__group"
            variants={itemVariants}
          >
            <h3 className="skills__category">
              <span className="skills__category-icon">{group.headerIcon}</span>
              {t(group.key)}
            </h3>
            <div className="skills__tags">
              {group.items.map((skill) => (
                <span key={skill.name} className="skills__tag">
                  <span className="skills__tag-icon">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { SiPython, SiReact, SiDocker } from 'react-icons/si';
import { TbBrain, TbRobot } from 'react-icons/tb';
import type { ReactNode } from 'react';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

interface Certification {
  id: string;
  titleKey: string;
  issuerKey: string;
  date: string;
  aura: Aura;
  icon: ReactNode;
  url?: string;
  tags: string[];
}

const auraStyles: Record<Aura, {
  iconBg: string;
  iconColor: string;
  blob: string;
  border: string;
  shadow: string;
  date: string;
  link: string;
}> = {
  aether: {
    iconBg: 'bg-aura-aether-mid/15',
    iconColor: 'text-aura-aether-mid',
    blob: 'bg-aura-aether-mid/20 group-hover:bg-aura-aether-mid/35',
    border: 'hover:border-aura-aether-mid/40',
    shadow: '0 0 25px -10px rgb(99 102 241 / 0.2)',
    date: 'text-aura-aether-start',
    link: 'text-aura-aether-mid hover:bg-aura-aether-mid/10',
  },
  vital: {
    iconBg: 'bg-aura-vital-mid/15',
    iconColor: 'text-aura-vital-mid',
    blob: 'bg-aura-vital-mid/20 group-hover:bg-aura-vital-mid/35',
    border: 'hover:border-aura-vital-mid/40',
    shadow: '0 0 25px -10px rgb(232 121 249 / 0.2)',
    date: 'text-aura-vital-start',
    link: 'text-aura-vital-mid hover:bg-aura-vital-mid/10',
  },
  flow: {
    iconBg: 'bg-aura-flow-mid/15',
    iconColor: 'text-aura-flow-mid',
    blob: 'bg-aura-flow-mid/20 group-hover:bg-aura-flow-mid/35',
    border: 'hover:border-aura-flow-mid/40',
    shadow: '0 0 25px -10px rgb(244 114 182 / 0.2)',
    date: 'text-aura-flow-start',
    link: 'text-aura-flow-mid hover:bg-aura-flow-mid/10',
  },
};

const certifications: Certification[] = [
  {
    id: 'masterclass',
    titleKey: 'certTitle1',
    issuerKey: 'certIssuer1',
    date: '2024',
    aura: 'flow',
    icon: <TbBrain />,
    tags: ['Data Science', 'AI', 'ML', 'Python'],
  },
  {
    id: 'react',
    titleKey: 'certTitle2',
    issuerKey: 'certIssuer2',
    date: '2024',
    aura: 'aether',
    icon: <SiReact />,
    tags: ['React', 'TypeScript', 'Hooks', 'State Management'],
  },
  {
    id: 'python-ds',
    titleKey: 'certTitle3',
    issuerKey: 'certIssuer3',
    date: '2024',
    aura: 'flow',
    icon: <SiPython />,
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    id: 'dwthon-agentic',
    titleKey: 'certTitle4',
    issuerKey: 'certIssuer4',
    date: 'Mar 2026',
    aura: 'vital',
    icon: <TbRobot />,
    url: '/certificates/dwthon-agentic.pdf',
    tags: ['Agentic AI', 'OpenClaw', 'Memory', 'Custom Skills'],
  },
  {
    id: 'docker',
    titleKey: 'certTitle5',
    issuerKey: 'certIssuer5',
    date: '2025',
    aura: 'aether',
    icon: <SiDocker />,
    tags: ['Docker', 'Compose', 'CI/CD', 'Deploy'],
  },
  {
    id: 'ai-agents',
    titleKey: 'certTitle6',
    issuerKey: 'certIssuer6',
    date: '2025',
    aura: 'vital',
    icon: <TbRobot />,
    tags: ['LLM', 'Agents', 'RAG', 'Embeddings'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Certifications() {
  const { t } = useLang();

  return (
    <section
      id="certs"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="block font-mono text-sm sm:text-base uppercase tracking-[0.3em] font-semibold text-text-secondary mb-4 md:mb-5">
          {t('certsLabel')}
        </span>
        <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="aura-text-aether">{t('certsTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {certifications.map((cert, i) => {
          const s = auraStyles[cert.aura];
          return (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              custom={i}
              className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-3xl p-5 md:p-6 transition-all duration-500 ${s.border}`}
              style={{ boxShadow: s.shadow }}
            >
              <div
                className={`absolute -right-8 -top-8 w-28 h-28 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${s.blob}`}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${s.iconBg} ${s.iconColor}`}>
                    <span className="text-2xl">{cert.icon}</span>
                  </div>
                  <FiAward className={`text-base ${s.iconColor} opacity-70`} />
                </div>

                <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary mb-1 leading-tight">
                  {t(cert.titleKey)}
                </h3>
                <p className="text-xs text-text-secondary mb-3">
                  {t(cert.issuerKey)}
                </p>

                <div className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider mb-4 ${s.date}`}>
                  <FiCalendar className="text-xs" />
                  <span>{cert.date}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md border border-border-subtle bg-bg-elevated/40 font-mono text-[10px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors ${s.link}`}
                  >
                    <FiExternalLink /> {t('certVerify')}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

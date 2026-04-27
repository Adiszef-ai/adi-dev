import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

interface Certification {
  id: string;
  titleKey: string;
  issuerKey: string;
  date: string;
  color: string;
  icon: string;
  url?: string;
  tags: string[];
}

const certifications: Certification[] = [
  {
    id: 'masterclass',
    titleKey: 'certTitle1',
    issuerKey: 'certIssuer1',
    date: '2024',
    color: '#f59e0b',
    icon: '🎓',
    tags: ['Data Science', 'AI', 'ML', 'Python'],
  },
  {
    id: 'react',
    titleKey: 'certTitle2',
    issuerKey: 'certIssuer2',
    date: '2024',
    color: '#06b6d4',
    icon: '⚛️',
    tags: ['React', 'TypeScript', 'Hooks', 'State Management'],
  },
  {
    id: 'python-ds',
    titleKey: 'certTitle3',
    issuerKey: 'certIssuer3',
    date: '2024',
    color: '#4ade80',
    icon: '🐍',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    id: 'fastapi',
    titleKey: 'certTitle4',
    issuerKey: 'certIssuer4',
    date: '2024',
    color: '#a78bfa',
    icon: '⚡',
    tags: ['FastAPI', 'REST API', 'SQLAlchemy', 'Auth'],
  },
  {
    id: 'docker',
    titleKey: 'certTitle5',
    issuerKey: 'certIssuer5',
    date: '2025',
    color: '#38bdf8',
    icon: '🐳',
    tags: ['Docker', 'Compose', 'CI/CD', 'Deploy'],
  },
  {
    id: 'ai-agents',
    titleKey: 'certTitle6',
    issuerKey: 'certIssuer6',
    date: '2025',
    color: '#f43f5e',
    icon: '🤖',
    tags: ['LLM', 'Agents', 'RAG', 'Embeddings'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Certifications() {
  const { t } = useLang();

  return (
    <section id="certs" className="certs">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('certsLabel')}</span>
        <h2 className="section-title">{t('certsTitle')}</h2>
      </motion.div>

      <div className="certs__grid">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            className="cert-card"
            style={{ '--cert-color': cert.color } as React.CSSProperties}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            custom={i}
          >
            <div className="cert-card__top">
              <span className="cert-card__icon">{cert.icon}</span>
              <div className="cert-card__badge">
                <FiAward />
              </div>
            </div>

            <h3 className="cert-card__title">{t(cert.titleKey)}</h3>
            <p className="cert-card__issuer">{t(cert.issuerKey)}</p>

            <div className="cert-card__date">
              <FiCalendar />
              <span>{cert.date}</span>
            </div>

            <div className="cert-card__tags">
              {cert.tags.map((tag) => (
                <span key={tag} className="cert-card__tag">{tag}</span>
              ))}
            </div>

            {cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-card__link">
                <FiExternalLink /> {t('certVerify')}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

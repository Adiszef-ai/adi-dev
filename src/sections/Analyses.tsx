import { motion } from 'framer-motion';
import { FiBarChart2, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

interface Analysis {
  id: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  color: string;
  metrics: { label: string; value: string }[];
  chartType: 'bar' | 'line' | 'scatter';
  github?: string;
}

const analyses: Analysis[] = [
  {
    id: 'eda-sales',
    titleKey: 'anTitle1',
    descKey: 'anDesc1',
    tags: ['Pandas', 'Matplotlib', 'Seaborn'],
    color: '#06b6d4',
    metrics: [
      { label: 'Records', value: '50K+' },
      { label: 'Features', value: '12' },
      { label: 'Accuracy', value: '94%' },
    ],
    chartType: 'bar',
  },
  {
    id: 'sentiment',
    titleKey: 'anTitle2',
    descKey: 'anDesc2',
    tags: ['NLP', 'OpenAI', 'Pandas', 'Plotly'],
    color: '#f59e0b',
    metrics: [
      { label: 'Reviews', value: '10K+' },
      { label: 'Languages', value: '3' },
      { label: 'F1 Score', value: '0.89' },
    ],
    chartType: 'line',
  },
  {
    id: 'clustering',
    titleKey: 'anTitle3',
    descKey: 'anDesc3',
    tags: ['Scikit-learn', 'K-Means', 'PCA', 'Plotly'],
    color: '#4ade80',
    metrics: [
      { label: 'Clusters', value: '5' },
      { label: 'Samples', value: '25K' },
      { label: 'Silhouette', value: '0.72' },
    ],
    chartType: 'scatter',
  },
];

function MiniChart({ type, color }: { type: string; color: string }) {
  if (type === 'bar') {
    return (
      <svg viewBox="0 0 120 50" className="analysis-card__chart">
        {[15, 30, 22, 40, 35, 45, 28, 38, 42, 48].map((h, i) => (
          <rect
            key={i}
            x={i * 12}
            y={50 - h}
            width="8"
            height={h}
            rx="2"
            fill={color}
            opacity={0.15 + (i * 0.08)}
          />
        ))}
      </svg>
    );
  }
  if (type === 'line') {
    return (
      <svg viewBox="0 0 120 50" className="analysis-card__chart">
        <polyline
          points="0,40 15,35 30,38 45,25 60,28 75,15 90,18 105,10 120,5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.5"
        />
        <polyline
          points="0,40 15,35 30,38 45,25 60,28 75,15 90,18 105,10 120,5"
          fill={`url(#gradient-${color})`}
          opacity="0.1"
          stroke="none"
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((x, i) => {
          const y = [40, 35, 38, 25, 28, 15, 18, 10, 5][i];
          return <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity="0.7" />;
        })}
      </svg>
    );
  }
  // scatter
  return (
    <svg viewBox="0 0 120 50" className="analysis-card__chart">
      {[
        [10, 35], [20, 25], [25, 30], [35, 15], [40, 20],
        [55, 10], [60, 18], [70, 8], [80, 25], [85, 12],
        [95, 30], [100, 22], [110, 15], [15, 42], [50, 38],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={color} opacity={0.2 + (i * 0.05)} />
      ))}
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Analyses() {
  const { t } = useLang();

  return (
    <section id="analyses" className="analyses">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('analysesLabel')}</span>
        <h2 className="section-title">{t('analysesTitle')}</h2>
      </motion.div>

      <div className="analyses__grid">
        {analyses.map((analysis, i) => (
          <motion.article
            key={analysis.id}
            className="analysis-card"
            style={{ '--card-color': analysis.color } as React.CSSProperties}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={i}
          >
            <div className="analysis-card__chart-container">
              <MiniChart type={analysis.chartType} color={analysis.color} />
            </div>

            <div className="analysis-card__content">
              <div className="analysis-card__icon" style={{ color: analysis.color }}>
                <FiBarChart2 />
              </div>
              <h3 className="analysis-card__title">{t(analysis.titleKey)}</h3>
              <p className="analysis-card__desc">{t(analysis.descKey)}</p>

              <div className="analysis-card__metrics">
                {analysis.metrics.map((m) => (
                  <div key={m.label} className="analysis-card__metric">
                    <span className="analysis-card__metric-value" style={{ color: analysis.color }}>
                      {m.value}
                    </span>
                    <span className="analysis-card__metric-label">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="analysis-card__tags">
                {analysis.tags.map((tag) => (
                  <span key={tag} className="analysis-card__tag">{tag}</span>
                ))}
              </div>

              <div className="analysis-card__links">
                {analysis.github && (
                  <a href={analysis.github} target="_blank" rel="noopener noreferrer" className="analysis-card__link">
                    <FiGithub /> Notebook
                  </a>
                )}
                <span className="analysis-card__link analysis-card__link--soon">
                  <FiExternalLink /> {t('anComingSoon')}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FiBarChart2, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

interface Analysis {
  id: string;
  titleKey: string;
  descKey: string;
  tags: string[];
  aura: Aura;
  metrics: { label: string; value: string }[];
  chartType: 'bar' | 'line' | 'scatter';
  github?: string;
  notebookUrl?: string;
}

const auraColors: Record<Aura, string> = {
  aether: '#6366f1',
  vital: '#e879f9',
  flow: '#f472b6',
};

const auraStyles: Record<Aura, {
  text: string;
  blob: string;
  border: string;
  shadow: string;
  metricText: string;
  iconBg: string;
}> = {
  aether: {
    text: 'text-aura-aether-mid',
    blob: 'bg-aura-aether-mid/20 group-hover:bg-aura-aether-mid/40',
    border: 'hover:border-aura-aether-mid/40',
    shadow: '0 0 30px -10px rgb(99 102 241 / 0.2)',
    metricText: 'text-aura-aether-start',
    iconBg: 'bg-aura-aether-mid/15 text-aura-aether-mid',
  },
  vital: {
    text: 'text-aura-vital-mid',
    blob: 'bg-aura-vital-mid/20 group-hover:bg-aura-vital-mid/40',
    border: 'hover:border-aura-vital-mid/40',
    shadow: '0 0 30px -10px rgb(232 121 249 / 0.2)',
    metricText: 'text-aura-vital-start',
    iconBg: 'bg-aura-vital-mid/15 text-aura-vital-mid',
  },
  flow: {
    text: 'text-aura-flow-mid',
    blob: 'bg-aura-flow-mid/20 group-hover:bg-aura-flow-mid/40',
    border: 'hover:border-aura-flow-mid/40',
    shadow: '0 0 30px -10px rgb(244 114 182 / 0.2)',
    metricText: 'text-aura-flow-start',
    iconBg: 'bg-aura-flow-mid/15 text-aura-flow-mid',
  },
};

const analyses: Analysis[] = [
  {
    id: 'jjit-eda',
    titleKey: 'anTitle1',
    descKey: 'anDesc1',
    tags: ['Pandas', 'Matplotlib', 'Seaborn', 'Plotly', 'Web scraping'],
    aura: 'aether',
    metrics: [
      { label: 'Offers', value: '5K+' },
      { label: 'Charts', value: '12+' },
      { label: 'Insights', value: 'Salary · Tech · Geo' },
    ],
    chartType: 'bar',
    notebookUrl: '/notebooks/justjoinit-eda.html',
    github: 'https://github.com/Adiszef-ai/adi-dev/blob/main/data-notebooks/justjoinit_EDA_archive_Adiszef-ai.ipynb',
  },
  {
    id: 'sentiment',
    titleKey: 'anTitle2',
    descKey: 'anDesc2',
    tags: ['NLP', 'OpenAI', 'Pandas', 'Plotly'],
    aura: 'vital',
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
    aura: 'flow',
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
      <svg viewBox="0 0 120 50" className="w-full h-full">
        {[15, 30, 22, 40, 35, 45, 28, 38, 42, 48].map((h, i) => (
          <rect
            key={i}
            x={i * 12}
            y={50 - h}
            width="8"
            height={h}
            rx="2"
            fill={color}
            opacity={0.2 + (i * 0.07)}
          />
        ))}
      </svg>
    );
  }
  if (type === 'line') {
    return (
      <svg viewBox="0 0 120 50" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="0,40 15,35 30,38 45,25 60,28 75,15 90,18 105,10 120,5 120,50 0,50"
          fill={`url(#gradient-${color.slice(1)})`}
        />
        <polyline
          points="0,40 15,35 30,38 45,25 60,28 75,15 90,18 105,10 120,5"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.7"
        />
        {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((x, i) => {
          const y = [40, 35, 38, 25, 28, 15, 18, 10, 5][i];
          return <circle key={i} cx={x} cy={y} r="2.5" fill={color} opacity="0.85" />;
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 50" className="w-full h-full">
      {[
        [10, 35], [20, 25], [25, 30], [35, 15], [40, 20],
        [55, 10], [60, 18], [70, 8], [80, 25], [85, 12],
        [95, 30], [100, 22], [110, 15], [15, 42], [50, 38],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={color} opacity={0.25 + (i * 0.04)} />
      ))}
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Analyses() {
  const { t } = useLang();

  return (
    <section
      id="analyses"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center md:pr-32 lg:pr-48"
      >
        <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-text-muted mb-5 md:mb-6">
          {t('analysesLabel')}
        </span>
        <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="aura-text-flow">{t('analysesTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {analyses.map((analysis, i) => {
          const s = auraStyles[analysis.aura];
          const color = auraColors[analysis.aura];
          return (
            <motion.article
              key={analysis.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={i}
              className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-3xl transition-all duration-500 ${s.border}`}
              style={{ boxShadow: s.shadow }}
            >
              <div
                className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${s.blob}`}
              />

              <div className="relative h-32 md:h-36 px-5 pt-5 flex items-end">
                <MiniChart type={analysis.chartType} color={color} />
              </div>

              <div className="relative p-5 md:p-6 pt-3">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${s.iconBg}`}>
                  <FiBarChart2 className="text-lg" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
                  {t(analysis.titleKey)}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {t(analysis.descKey)}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {analysis.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-bg-elevated/40 border border-border-subtle rounded-lg p-2 text-center"
                    >
                      <div className={`font-display text-base font-semibold ${s.metricText}`}>
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-text-muted mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {analysis.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md border border-border-subtle bg-bg-elevated/40 font-mono text-[10px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {analysis.notebookUrl && (
                    <a
                      href={analysis.notebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md ${s.text} hover:bg-bg-elevated/40 transition-colors`}
                    >
                      <FiExternalLink /> {t('anView')}
                    </a>
                  )}
                  {analysis.github && (
                    <a
                      href={analysis.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
                    >
                      <FiGithub /> Source
                    </a>
                  )}
                  {!analysis.notebookUrl && !analysis.github && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border border-dashed border-border-subtle text-text-muted">
                      <FiExternalLink /> {t('anComingSoon')}
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

type Ring = 'mastered' | 'using' | 'learning' | 'exploring';

interface TechItem {
  name: string;
  ring: Ring;
  quadrant: number; // 0-3
}

const ringConfig: Record<Ring, { labelKey: string; color: string; radius: number }> = {
  mastered: { labelKey: 'radarMastered', color: '#4ade80', radius: 25 },
  using: { labelKey: 'radarUsing', color: '#06b6d4', radius: 45 },
  learning: { labelKey: 'radarLearning', color: '#f59e0b', radius: 65 },
  exploring: { labelKey: 'radarExploring', color: '#a78bfa', radius: 85 },
};

const techItems: TechItem[] = [
  // Mastered
  { name: 'Python', ring: 'mastered', quadrant: 0 },
  { name: 'React', ring: 'mastered', quadrant: 1 },
  { name: 'SQL', ring: 'mastered', quadrant: 2 },
  { name: 'Git', ring: 'mastered', quadrant: 3 },

  // Using daily
  { name: 'TypeScript', ring: 'using', quadrant: 0 },
  { name: 'FastAPI', ring: 'using', quadrant: 1 },
  { name: 'Docker', ring: 'using', quadrant: 2 },
  { name: 'PostgreSQL', ring: 'using', quadrant: 3 },
  { name: 'OpenAI', ring: 'using', quadrant: 0 },
  { name: 'Supabase', ring: 'using', quadrant: 1 },

  // Learning
  { name: 'Next.js', ring: 'learning', quadrant: 1 },
  { name: 'LangChain', ring: 'learning', quadrant: 0 },
  { name: 'RAG', ring: 'learning', quadrant: 2 },
  { name: 'Embeddings', ring: 'learning', quadrant: 3 },
  { name: 'CrewAI', ring: 'learning', quadrant: 0 },

  // Exploring
  { name: 'Rust', ring: 'exploring', quadrant: 0 },
  { name: 'Kubernetes', ring: 'exploring', quadrant: 2 },
  { name: 'Fine-tuning', ring: 'exploring', quadrant: 3 },
  { name: 'Claude SDK', ring: 'exploring', quadrant: 1 },
  { name: 'MCP', ring: 'exploring', quadrant: 3 },
];

function getPosition(item: TechItem, index: number): { x: number; y: number } {
  const ring = ringConfig[item.ring];
  const baseAngle = item.quadrant * 90 + 45;
  const spreadAngle = 20;
  const itemsInQuadrant = techItems.filter(
    (t) => t.ring === item.ring && t.quadrant === item.quadrant
  );
  const posInQuadrant = itemsInQuadrant.indexOf(item);
  const angle = (baseAngle + (posInQuadrant - (itemsInQuadrant.length - 1) / 2) * spreadAngle) * (Math.PI / 180);
  const jitter = (index % 3 - 1) * 4;

  return {
    x: 50 + (ring.radius + jitter) * Math.cos(angle) * 0.48,
    y: 50 + (ring.radius + jitter) * Math.sin(angle) * 0.48,
  };
}

const quadrantLabels = [
  { key: 'radarQ1', x: 15, y: 8 },
  { key: 'radarQ2', x: 70, y: 8 },
  { key: 'radarQ3', x: 70, y: 95 },
  { key: 'radarQ4', x: 15, y: 95 },
];

export default function TechRadar() {
  const { t } = useLang();

  return (
    <section id="radar" className="radar">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('radarLabel')}</span>
        <h2 className="section-title">{t('radarTitle')}</h2>
      </motion.div>

      <div className="radar__layout">
        <motion.div
          className="radar__chart"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 100 100" className="radar__svg">
            {/* Rings */}
            {Object.values(ringConfig).map((ring) => (
              <circle
                key={ring.radius}
                cx="50"
                cy="50"
                r={ring.radius * 0.48}
                fill="none"
                stroke={ring.color}
                strokeWidth="0.3"
                opacity="0.25"
              />
            ))}

            {/* Crosshairs */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(6,182,212,0.1)" strokeWidth="0.2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(6,182,212,0.1)" strokeWidth="0.2" />

            {/* Quadrant labels */}
            {quadrantLabels.map((q) => (
              <text
                key={q.key}
                x={q.x}
                y={q.y}
                fill="rgba(148,163,184,0.4)"
                fontSize="2.5"
                fontFamily="JetBrains Mono, monospace"
              >
                {t(q.key)}
              </text>
            ))}

            {/* Tech dots */}
            {techItems.map((item, i) => {
              const pos = getPosition(item, i);
              const ring = ringConfig[item.ring];
              return (
                <g key={item.name}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="1.8"
                    fill={ring.color}
                    opacity="0.8"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 3.5}
                    fill="rgba(232,237,245,0.7)"
                    fontSize="1.8"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {item.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        <motion.div
          className="radar__legend"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([key, ring]) => {
            const items = techItems.filter((t) => t.ring === key);
            return (
              <div key={key} className="radar__legend-group">
                <div className="radar__legend-header">
                  <span className="radar__legend-dot" style={{ background: ring.color }} />
                  <span className="radar__legend-label" style={{ color: ring.color }}>
                    {t(ring.labelKey)}
                  </span>
                </div>
                <div className="radar__legend-items">
                  {items.map((item) => (
                    <span key={item.name} className="radar__legend-item">{item.name}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

type Ring = 'mastered' | 'using' | 'learning' | 'exploring';

interface TechItem {
  name: string;
  ring: Ring;
  quadrant: number; // 0-3
}

const ringConfig: Record<Ring, { labelKey: string; color: string; radius: number }> = {
  mastered:  { labelKey: 'radarMastered',  color: '#34d399', radius: 25 }, // flow-start
  using:     { labelKey: 'radarUsing',     color: '#22d3ee', radius: 45 }, // aether-start
  learning:  { labelKey: 'radarLearning',  color: '#e879f9', radius: 65 }, // vital-mid
  exploring: { labelKey: 'radarExploring', color: '#fbbf24', radius: 85 }, // flow-end
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
    <section
      id="radar"
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
          {t('radarLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="aura-text-aether">{t('radarTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative aspect-square w-full max-w-[640px] mx-auto bg-bg-surface/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-4"
          style={{ boxShadow: '0 0 60px -20px rgb(99 102 241 / 0.2)' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
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
            <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(168, 165, 184, 0.1)" strokeWidth="0.2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(168, 165, 184, 0.1)" strokeWidth="0.2" />

            {/* Quadrant labels */}
            {quadrantLabels.map((q) => (
              <text
                key={q.key}
                x={q.x}
                y={q.y}
                fill="rgba(168, 165, 184, 0.5)"
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
                    opacity="0.85"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 3.5}
                    fill="rgba(248, 247, 250, 0.75)"
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
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([key, ring]) => {
            const items = techItems.filter((t) => t.ring === key);
            return (
              <div
                key={key}
                className="bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: ring.color, boxShadow: `0 0 10px ${ring.color}` }}
                  />
                  <span
                    className="font-mono text-xs uppercase tracking-[0.2em]"
                    style={{ color: ring.color }}
                  >
                    {t(ring.labelKey)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item.name}
                      className="px-2 py-0.5 rounded-md bg-bg-elevated/50 border border-border-subtle font-mono text-[11px] text-text-secondary"
                    >
                      {item.name}
                    </span>
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

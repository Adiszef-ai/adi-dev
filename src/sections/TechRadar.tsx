import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLang } from '../contexts/LanguageContext';

type Ring = 'mastered' | 'using' | 'learning' | 'exploring';
type Quadrant = 0 | 1 | 2 | 3;

interface TechItem {
  name: string;
  ring: Ring;
  quadrant: Quadrant;
}

const ringConfig: Record<Ring, { labelKey: string; color: string; glow: string; intensity: number }> = {
  mastered:  { labelKey: 'radarMastered',  color: '#10b981', glow: 'rgba(16, 185, 129, 0.45)',  intensity: 1.00 },
  using:     { labelKey: 'radarUsing',     color: '#06b6d4', glow: 'rgba(6, 182, 212, 0.40)',   intensity: 0.85 },
  learning:  { labelKey: 'radarLearning',  color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.35)',  intensity: 0.70 },
  exploring: { labelKey: 'radarExploring', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.30)',  intensity: 0.55 },
};

const quadrantKeys = ['radarQ1', 'radarQ2', 'radarQ3', 'radarQ4'] as const;

const techItems: TechItem[] = [
  // Q0 — Languages
  { name: 'Python', ring: 'mastered', quadrant: 0 },
  { name: 'TypeScript', ring: 'using', quadrant: 0 },
  { name: 'SQL', ring: 'using', quadrant: 0 },
  { name: 'Rust', ring: 'exploring', quadrant: 0 },

  // Q1 — Frameworks
  { name: 'React', ring: 'mastered', quadrant: 1 },
  { name: 'FastAPI', ring: 'using', quadrant: 1 },
  { name: 'Next.js', ring: 'learning', quadrant: 1 },
  { name: 'Tailwind', ring: 'using', quadrant: 1 },
  { name: 'Vite', ring: 'using', quadrant: 1 },

  // Q2 — Infra
  { name: 'Git', ring: 'mastered', quadrant: 2 },
  { name: 'Docker', ring: 'using', quadrant: 2 },
  { name: 'PostgreSQL', ring: 'using', quadrant: 2 },
  { name: 'Supabase', ring: 'using', quadrant: 2 },
  { name: 'Hetzner', ring: 'learning', quadrant: 2 },
  { name: 'Kubernetes', ring: 'exploring', quadrant: 2 },

  // Q3 — AI / Data
  { name: 'OpenAI', ring: 'mastered', quadrant: 3 },
  { name: 'Claude SDK', ring: 'using', quadrant: 3 },
  { name: 'LangChain', ring: 'learning', quadrant: 3 },
  { name: 'CrewAI', ring: 'learning', quadrant: 3 },
  { name: 'RAG', ring: 'learning', quadrant: 3 },
  { name: 'Embeddings', ring: 'learning', quadrant: 3 },
  { name: 'Fine-tuning', ring: 'exploring', quadrant: 3 },
  { name: 'MCP', ring: 'exploring', quadrant: 3 },
];

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

function Hex({ name, ring, hovered, onHover }: { name: string; ring: typeof ringConfig[Ring]; hovered: boolean; onHover: (v: boolean) => void }) {
  return (
    <motion.div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="relative cursor-default"
      style={{ width: 64, height: 72 }}
    >
      <div
        className="absolute inset-0"
        style={{
          clipPath: HEX_CLIP,
          background: hovered ? ring.color : `${ring.color}22`,
          boxShadow: hovered ? `0 0 24px ${ring.glow}` : 'none',
          transition: 'background 200ms ease, box-shadow 200ms ease',
        }}
      />
      <div
        className="absolute inset-[1.5px]"
        style={{
          clipPath: HEX_CLIP,
          background: hovered
            ? `linear-gradient(140deg, ${ring.color}cc, ${ring.color}66)`
            : 'rgb(20, 18, 32)',
          transition: 'background 200ms ease',
        }}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center px-1.5">
        <span
          className="font-mono text-[9px] font-medium text-center leading-tight tracking-tight"
          style={{
            color: hovered ? '#0b0918' : ring.color,
            opacity: hovered ? 1 : ring.intensity,
            transition: 'color 200ms ease, opacity 200ms ease',
          }}
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
}

export default function TechRadar() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);

  const cellCounts: Record<string, number> = {};
  techItems.forEach((item) => {
    const key = `${item.quadrant}-${item.ring}`;
    cellCounts[key] = (cellCounts[key] ?? 0) + 1;
  });

  return (
    <section id="radar" className="relative px-8 md:px-20 lg:px-28 xl:px-36 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14"
      >
        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
          {t('radarLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="aura-text-aether">{t('radarTitle')}</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-bg-surface/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-5 md:p-8 overflow-x-auto"
        style={{ boxShadow: '0 0 60px -25px rgb(99 102 241 / 0.25)' }}
      >
        {/* Legend strip */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 pb-5 border-b border-border-subtle">
          {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([key, ring]) => {
            const count = techItems.filter((tech) => tech.ring === key).length;
            return (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="w-3 h-3"
                  style={{
                    clipPath: HEX_CLIP,
                    background: ring.color,
                    boxShadow: `0 0 8px ${ring.glow}`,
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ring.color }}>
                  {t(ring.labelKey)}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Matrix */}
        <div
          className="grid gap-x-4 gap-y-3 min-w-[640px]"
          style={{ gridTemplateColumns: '110px repeat(4, minmax(0, 1fr))' }}
        >
          {/* Header row */}
          <div />
          {quadrantKeys.map((qKey, qIdx) => (
            <div key={qKey} className="flex items-end pb-2 border-b border-border-subtle">
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-text-secondary">
                <span className="text-text-muted mr-1.5">0{qIdx + 1}</span>
                {t(qKey)}
              </span>
            </div>
          ))}

          {/* Body rows */}
          {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([rKey, ring]) => (
            <div key={`row-${rKey}`} className="contents">
              <div className="flex items-center pr-2">
                <div className="flex flex-col gap-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: ring.color }}
                  >
                    {t(ring.labelKey)}
                  </span>
                  <span className="font-mono text-[9px] text-text-muted tracking-wider">
                    {Math.round(ring.intensity * 100)}%
                  </span>
                </div>
              </div>
              {[0, 1, 2, 3].map((q) => {
                const cellItems = techItems.filter((tech) => tech.ring === rKey && tech.quadrant === q);
                return (
                  <div
                    key={`cell-${rKey}-${q}`}
                    className="relative flex flex-wrap gap-x-1 gap-y-1.5 items-start py-2 px-1 rounded-xl border border-transparent hover:border-border-subtle/50 transition-colors min-h-[72px]"
                  >
                    {cellItems.length === 0 && (
                      <span className="font-mono text-[10px] text-text-muted/40 self-center mx-auto">·</span>
                    )}
                    {cellItems.map((item) => (
                      <Hex
                        key={item.name}
                        name={item.name}
                        ring={ring}
                        hovered={hovered === item.name}
                        onHover={(v) => setHovered(v ? item.name : null)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

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
  { name: 'Python', ring: 'mastered', quadrant: 0 },
  { name: 'TypeScript', ring: 'using', quadrant: 0 },
  { name: 'SQL', ring: 'using', quadrant: 0 },
  { name: 'Rust', ring: 'exploring', quadrant: 0 },

  { name: 'React', ring: 'mastered', quadrant: 1 },
  { name: 'FastAPI', ring: 'using', quadrant: 1 },
  { name: 'Next.js', ring: 'learning', quadrant: 1 },
  { name: 'Tailwind', ring: 'using', quadrant: 1 },
  { name: 'Vite', ring: 'using', quadrant: 1 },

  { name: 'Git', ring: 'mastered', quadrant: 2 },
  { name: 'Docker', ring: 'using', quadrant: 2 },
  { name: 'PostgreSQL', ring: 'using', quadrant: 2 },
  { name: 'Supabase', ring: 'using', quadrant: 2 },
  { name: 'Hetzner', ring: 'learning', quadrant: 2 },
  { name: 'Kubernetes', ring: 'exploring', quadrant: 2 },

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

function Hex({
  name,
  ring,
  hovered,
  onHover,
  size = 'md',
}: {
  name: string;
  ring: typeof ringConfig[Ring];
  hovered: boolean;
  onHover: (v: boolean) => void;
  size?: 'sm' | 'md';
}) {
  const dims = size === 'sm' ? { w: 56, h: 64, font: 8.5 } : { w: 64, h: 72, font: 9 };
  return (
    <motion.div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="relative cursor-default"
      style={{ width: dims.w, height: dims.h }}
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
          className="font-mono font-medium text-center leading-tight tracking-tight"
          style={{
            fontSize: `${dims.font}px`,
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

  return (
    <section id="radar" className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-3 md:gap-5">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-text-muted mb-5 md:mb-6">
            {t('radarLabel')}
          </span>
          <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="aura-text-aether">{t('radarTitle')}</span>
          </h2>
        </motion.div>

        {/* Mobile / Tablet — stacked ring cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([rKey, ring]) => {
            const items = techItems.filter((tech) => tech.ring === rKey);
            return (
              <motion.div
                key={`m-${rKey}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45 }}
                className="bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-2xl p-4"
                style={{ boxShadow: `0 0 30px -16px ${ring.glow}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5"
                      style={{
                        clipPath: HEX_CLIP,
                        background: ring.color,
                        boxShadow: `0 0 8px ${ring.glow}`,
                      }}
                    />
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: ring.color }}
                    >
                      {t(ring.labelKey)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted tracking-wider">
                    {items.length} · {Math.round(ring.intensity * 100)}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <Hex
                      key={item.name}
                      name={item.name}
                      ring={ring}
                      hovered={hovered === item.name}
                      onHover={(v) => setHovered(v ? item.name : null)}
                      size="sm"
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop — quadrant×ring matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="hidden md:block relative bg-bg-surface/30 backdrop-blur-sm border border-border-subtle rounded-3xl p-4 md:p-5 overflow-x-auto max-w-3xl mx-auto"
          style={{ boxShadow: '0 0 60px -25px rgb(99 102 241 / 0.25)' }}
        >
          {/* Matrix */}
          <div
            className="grid gap-x-3 gap-y-1.5 min-w-[600px]"
            style={{ gridTemplateColumns: '100px repeat(4, minmax(0, 1fr))' }}
          >
            <div />
            {quadrantKeys.map((qKey, qIdx) => {
              const ringForCol = (Object.values(ringConfig))[qIdx];
              return (
                <div
                  key={qKey}
                  className="flex items-end pb-2 border-b"
                  style={{ borderColor: `${ringForCol.color}66` }}
                >
                  <span
                    className="font-mono text-xs md:text-sm uppercase tracking-[0.22em] font-bold"
                    style={{ color: ringForCol.color, textShadow: `0 0 12px ${ringForCol.glow}` }}
                  >
                    {t(qKey)}
                  </span>
                </div>
              );
            })}

            {(Object.entries(ringConfig) as [Ring, typeof ringConfig[Ring]][]).map(([rKey, ring]) => (
              <div key={`row-${rKey}`} className="contents">
                <div className="flex items-center justify-center pr-2">
                  <div className="flex flex-col items-start gap-1 -rotate-45 origin-center">
                    <span
                      className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold whitespace-pre-line leading-tight"
                      style={{ color: ring.color }}
                    >
                      {t(ring.labelKey).split(' ').join('\n')}
                    </span>
                    <span className="font-mono text-[11px] md:text-xs text-text-muted tracking-wider font-semibold">
                      {Math.round(ring.intensity * 100)}%
                    </span>
                  </div>
                </div>
                {[0, 1, 2, 3].map((q) => {
                  const cellItems = techItems.filter((tech) => tech.ring === rKey && tech.quadrant === q);
                  return (
                    <div
                      key={`cell-${rKey}-${q}`}
                      className="relative flex flex-wrap gap-x-1 gap-y-1 items-start py-1 px-1 rounded-xl border border-transparent hover:border-border-subtle/50 transition-colors min-h-[56px]"
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

      </div>
    </section>
  );
}

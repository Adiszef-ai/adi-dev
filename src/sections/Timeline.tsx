import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

interface TimelineItem {
  year: string;
  titleKey: string;
  descKey: string;
  aura: Aura;
}

const timelineData: TimelineItem[] = [
  { year: '2024-09', titleKey: 'tlTitle1', descKey: 'tlDesc1', aura: 'aether' },
  { year: '2024-12', titleKey: 'tlTitle2', descKey: 'tlDesc2', aura: 'aether' },
  { year: '2025-07', titleKey: 'tlTitle3', descKey: 'tlDesc3', aura: 'vital' },
  { year: '2026-01', titleKey: 'tlTitle4', descKey: 'tlDesc4', aura: 'flow' },
];

const auraStyles: Record<Aura, {
  yearText: string;
  nodeBorder: string;
  nodeInner: string;
  nodeShadow: string;
  cardBorder: string;
  cardShadow: string;
}> = {
  aether: {
    yearText: 'text-aura-aether-mid',
    nodeBorder: 'border-aura-aether-mid',
    nodeInner: 'bg-aura-aether-mid',
    nodeShadow: 'shadow-[0_0_15px_rgb(99_102_241/0.6)]',
    cardBorder: 'hover:border-aura-aether-mid/40',
    cardShadow: '0 0 25px -10px rgb(99 102 241 / 0.25)',
  },
  vital: {
    yearText: 'text-aura-vital-mid',
    nodeBorder: 'border-aura-vital-mid',
    nodeInner: 'bg-aura-vital-mid',
    nodeShadow: 'shadow-[0_0_15px_rgb(232_121_249/0.6)]',
    cardBorder: 'hover:border-aura-vital-mid/40',
    cardShadow: '0 0 25px -10px rgb(232 121 249 / 0.25)',
  },
  flow: {
    yearText: 'text-aura-flow-mid',
    nodeBorder: 'border-aura-flow-mid',
    nodeInner: 'bg-aura-flow-mid',
    nodeShadow: 'shadow-[0_0_15px_rgb(244_114_182/0.6)]',
    cardBorder: 'hover:border-aura-flow-mid/40',
    cardShadow: '0 0 25px -10px rgb(244 114 182 / 0.25)',
  },
};


interface CardProps {
  item: TimelineItem;
  s: typeof auraStyles[Aura];
  t: (key: string) => string;
  side: 'left' | 'right';
}

function Card({ item, s, t, side }: CardProps) {
  return (
    <div
      className={`w-full md:max-w-[420px] bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-2xl p-4 md:p-5 transition-all duration-300 ${s.cardBorder} ${side === 'left' ? 'md:text-right' : 'md:text-left'}`}
      style={{ boxShadow: s.cardShadow }}
    >
      <div className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 ${s.yearText}`}>
        {item.year}
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary mb-2 leading-tight">
        {t(item.titleKey)}
      </h3>
      <p className="text-text-secondary text-sm md:text-base leading-relaxed md:line-clamp-3 lg:line-clamp-4">
        {t(item.descKey)}
      </p>
    </div>
  );
}

export default function Timeline() {
  const { t } = useLang();

  return (
    <section
      id="timeline"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-5 md:gap-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="block font-mono text-sm sm:text-base uppercase tracking-[0.3em] font-semibold text-text-secondary mb-4 md:mb-5">
          {t('timelineLabel')}
        </span>
        <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="aura-text-aether">{t('timelineTitle')}</span>
        </h2>
      </motion.div>

      {/* Mobile timeline — dot + karta po prawej */}
      <div className="md:hidden relative w-full max-w-md mx-auto">
        <div
          className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-aura-aether-mid via-aura-vital-mid to-aura-flow-mid opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-3">
          {timelineData.map((item, i) => {
            const s = auraStyles[item.aura];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.08, ease: 'easeOut' as const }}
                className="group relative grid grid-cols-[32px_1fr] gap-3 items-start"
              >
                <div className="flex items-start justify-center pt-3">
                  <div
                    className={`relative z-10 w-4 h-4 rounded-full bg-bg-deep border-2 ${s.nodeBorder} ${s.nodeShadow} flex items-center justify-center transition-transform duration-300 group-hover:scale-125`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${s.nodeInner}`} />
                  </div>
                </div>
                <div className="min-w-0">
                  <Card item={item} s={s} t={t} side="right" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop timeline — 2 osobne kolumny z offsetem prawej, każda karta ma własny dot przy linii */}
      <div className="hidden md:block relative w-full max-w-5xl mx-auto">
        {/* Linia środkowa */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-aura-aether-mid via-aura-vital-mid to-aura-flow-mid opacity-40 pointer-events-none"
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 gap-x-12">
          {/* LEWA kolumna — parzyste indexy (0, 2) */}
          <div className="flex flex-col gap-8 items-end">
            {timelineData.filter((_, i) => i % 2 === 0).map((item, idx) => {
              const s = auraStyles[item.aura];
              const realIdx = idx * 2;
              return (
                <motion.div
                  key={`l-${realIdx}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: 0.08 + realIdx * 0.08 }}
                  className="group flex items-center gap-3 w-full justify-end"
                >
                  <Card item={item} s={s} t={t} side="left" />
                  <div
                    className={`relative z-10 shrink-0 w-5 h-5 rounded-full bg-bg-deep border-2 ${s.nodeBorder} ${s.nodeShadow} flex items-center justify-center transition-transform duration-300 group-hover:scale-125 -mr-[26px]`}
                  >
                    <div className={`w-2 h-2 rounded-full ${s.nodeInner}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* PRAWA kolumna — nieparzyste (1, 3), z offset top żeby się przeplatały */}
          <div className="flex flex-col gap-8 items-start pt-32">
            {timelineData.filter((_, i) => i % 2 === 1).map((item, idx) => {
              const s = auraStyles[item.aura];
              const realIdx = idx * 2 + 1;
              return (
                <motion.div
                  key={`r-${realIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: 0.08 + realIdx * 0.08 }}
                  className="group flex items-center gap-3 w-full justify-start"
                >
                  <div
                    className={`relative z-10 shrink-0 w-5 h-5 rounded-full bg-bg-deep border-2 ${s.nodeBorder} ${s.nodeShadow} flex items-center justify-center transition-transform duration-300 group-hover:scale-125 -ml-[26px]`}
                  >
                    <div className={`w-2 h-2 rounded-full ${s.nodeInner}`} />
                  </div>
                  <Card item={item} s={s} t={t} side="right" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

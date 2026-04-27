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
  { year: '2024', titleKey: 'tlTitle1', descKey: 'tlDesc1', aura: 'aether' },
  { year: '2024', titleKey: 'tlTitle2', descKey: 'tlDesc2', aura: 'aether' },
  { year: '2025', titleKey: 'tlTitle3', descKey: 'tlDesc3', aura: 'vital' },
  { year: '2026', titleKey: 'tlTitle4', descKey: 'tlDesc4', aura: 'flow' },
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

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Timeline() {
  const { t } = useLang();

  return (
    <section
      id="timeline"
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
          {t('timelineLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="aura-text-aether">{t('timelineTitle')}</span>
        </h2>
      </motion.div>

      <div className="relative max-w-3xl ml-3 md:ml-6 border-l border-border-subtle pl-8 md:pl-14 space-y-12 md:space-y-16">
        {timelineData.map((item, i) => {
          const s = auraStyles[item.aura];
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="group relative"
            >
              {/* Node on the line */}
              <div
                className={`absolute -left-[41px] md:-left-[63px] top-1.5 w-5 h-5 rounded-full bg-bg-deep border-2 ${s.nodeBorder} ${s.nodeShadow} flex items-center justify-center transition-transform duration-300 group-hover:scale-125`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${s.nodeInner}`} />
              </div>

              {/* Card */}
              <div
                className={`bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-2xl p-5 md:p-6 transition-all duration-300 ${s.cardBorder}`}
                style={{ boxShadow: s.cardShadow }}
              >
                <div className={`font-mono text-xs uppercase tracking-[0.2em] mb-2 ${s.yearText}`}>
                  {item.year}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {t(item.descKey)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

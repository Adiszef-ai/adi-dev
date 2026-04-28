import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FiCode, FiCpu, FiGlobe, FiAward } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const formatted =
    target >= 1000 ? `${Math.floor(count / 1000)}k` : count.toString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

interface CounterDef {
  icon: React.ReactNode;
  target: number;
  suffix?: string;
  labelKey: string;
  aura: Aura;
}

const counters: CounterDef[] = [
  { icon: <FiCode />, target: 167000, suffix: '+', labelKey: 'aboutLines', aura: 'vital' },
  { icon: <FiCpu />, target: 4, suffix: '', labelKey: 'aboutApps', aura: 'aether' },
  { icon: <FiGlobe />, target: 6, suffix: '', labelKey: 'aboutLangs', aura: 'flow' },
  { icon: <FiAward />, target: 200, suffix: '+', labelKey: 'aboutCommits', aura: 'aether' },
];

const counterAuraStyles: Record<Aura, { iconColor: string; blob: string; border: string; shadow: string }> = {
  aether: {
    iconColor: 'text-aura-aether-mid',
    blob: 'bg-aura-aether-mid/20 group-hover:bg-aura-aether-mid/40',
    border: 'hover:border-aura-aether-mid/40',
    shadow: '0 0 20px -8px rgb(99 102 241 / 0.25)',
  },
  vital: {
    iconColor: 'text-aura-vital-mid',
    blob: 'bg-aura-vital-mid/20 group-hover:bg-aura-vital-mid/40',
    border: 'hover:border-aura-vital-mid/40',
    shadow: '0 0 20px -8px rgb(232 121 249 / 0.25)',
  },
  flow: {
    iconColor: 'text-aura-flow-mid',
    blob: 'bg-aura-flow-mid/20 group-hover:bg-aura-flow-mid/40',
    border: 'hover:border-aura-flow-mid/40',
    shadow: '0 0 20px -8px rgb(244 114 182 / 0.25)',
  },
};

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-6xl mx-auto md:mx-0 flex flex-col gap-8 md:gap-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-text-muted mb-2.5">
            {t('aboutLabel')}
          </span>
          <h2 className="font-display text-[clamp(2rem,8vw,3.25rem)] md:text-5xl font-semibold tracking-tight leading-[1.05]">
            <span className="aura-text-flow">{t('aboutTitle')}</span>
          </h2>
        </motion.div>

        {/* Narrative — pełna szerokość, wszystkie 3 paragrafy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col gap-4 max-w-3xl"
        >
          <p className="text-base sm:text-lg md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP1')}
          </p>
          <p className="text-base sm:text-lg md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP2')}
          </p>
          <p className="text-base sm:text-lg md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP3')}
          </p>
        </motion.div>

        {/* Counters — 2x2 mobile, 4x1 desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {counters.map((c) => {
            const s = counterAuraStyles[c.aura];
            return (
              <div
                key={c.labelKey}
                className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-2xl p-4 md:p-5 transition-all duration-500 ${s.border}`}
                style={{ boxShadow: s.shadow }}
              >
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 blur-3xl rounded-full transition-colors duration-500 ${s.blob}`}
                />
                <div className="relative flex flex-col gap-1.5">
                  <span className={`text-lg md:text-xl ${s.iconColor}`}>{c.icon}</span>
                  <span className="font-display text-2xl md:text-3xl font-semibold text-text-primary leading-none">
                    <AnimatedCounter target={c.target} suffix={c.suffix} />
                  </span>
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest text-text-muted leading-snug">
                    {t(c.labelKey)}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

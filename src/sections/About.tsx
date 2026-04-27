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
    const duration = 2000;
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
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
          {t('aboutLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="aura-text-flow">{t('aboutTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-12 md:mb-16">
        {/* Avatar with Aura Flow ring */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-4 flex flex-col items-center lg:items-start gap-4"
        >
          <div className="relative">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-[3px] aura-bg-flow shadow-[0_0_50px_-10px_rgb(244_114_182/0.4)]">
              <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center font-display text-5xl md:text-6xl font-semibold text-text-primary">
                AR
              </div>
            </div>
            {/* Orbital pulse dots */}
            <div className="absolute -top-1 right-4 w-2.5 h-2.5 rounded-full bg-aura-flow-end shadow-[0_0_10px_rgb(251_191_36/0.7)] animate-pulse" />
            <div
              className="absolute bottom-6 -left-2 w-2 h-2 rounded-full bg-aura-flow-start shadow-[0_0_8px_rgb(52_211_153/0.7)] animate-pulse"
              style={{ animationDelay: '-1.5s' }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-glass backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              {t('aboutAvailable')}
            </span>
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-8 flex flex-col gap-5"
        >
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP1')}
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP2')}
          </p>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP3')}
          </p>
        </motion.div>
      </div>

      {/* Counters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
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
              <div className="relative flex flex-col gap-2">
                <span className={`text-xl ${s.iconColor}`}>{c.icon}</span>
                <span className="font-display text-2xl md:text-3xl font-semibold text-text-primary">
                  <AnimatedCounter target={c.target} suffix={c.suffix} />
                </span>
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted">
                  {t(c.labelKey)}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}

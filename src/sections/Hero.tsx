import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiChevronDown, FiCode, FiCpu, FiGlobe, FiAward } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' as const },
  }),
};

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

  const formatted = target >= 1000 ? `${Math.floor(count / 1000)}k` : count.toString();

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

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-24 pb-32 md:pt-20 md:pb-24 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto md:mx-0 flex flex-col gap-5 md:gap-8">

        {/* Greeting */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="block font-mono text-sm sm:text-base uppercase tracking-[0.32em] text-text-secondary"
        >
          {(() => {
            const greeting = t('greeting');
            const commaIdx = greeting.indexOf(',');
            if (commaIdx === -1) return greeting;
            return (
              <>
                <span className="aura-text-vital opacity-70">{greeting.slice(0, commaIdx)}</span>
                {greeting.slice(commaIdx)}
              </>
            );
          })()}
        </motion.span>

        {/* Hero name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-display font-normal tracking-tight leading-[1.02] text-[clamp(3.25rem,12vw,7rem)]"
        >
          <span className="text-text-primary block">Adrian</span>
          <span className="aura-text-aether block">Runiewicz</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="font-mono text-base sm:text-lg md:text-xl text-text-secondary min-h-[1.75rem] flex items-center gap-2"
        >
          <span className="text-aura-vital-mid">&gt;</span>
          <TypeAnimation
            sequence={[
              'AI Product Engineer_',
              2200,
              'System Builder_',
              2200,
              'Full Stack Developer_',
              2000,
              'Solo Founder_',
              2000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="font-body text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl"
        >
          {t('heroDesc')}
        </motion.p>

        {/* Counters — 2x2 mobile, 4x1 desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl"
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

        {/* Scroll hint — nie zasłania FAB-ów */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-6 flex-col items-center gap-1 text-text-muted pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiChevronDown className="text-lg" />
          </motion.span>
        </motion.div>

      </div>
    </section>
  );
}
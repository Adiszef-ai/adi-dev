import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiCode, FiCpu, FiGlobe, FiAward } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

const ROLE_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ['AI Product Engineer', 'System Builder'],
  ['Full Stack Developer', 'Solo Founder'],
];

const TYPE_SPEED = 65;
const ERASE_SPEED = 35;
const HOLD_FULL = 1800;
const HOLD_EMPTY = 250;
const FADE_MS = 180;

function buildLine(pair: readonly [string, string]) {
  return `>${pair[0]}<  >${pair[1]}<`;
}

function TypingRoles() {
  const [pairIdx, setPairIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'hold' | 'erasing'>('typing');
  const [progress, setProgress] = useState(0);

  const text = buildLine(ROLE_PAIRS[pairIdx]);
  const totalLen = text.length;

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (progress < totalLen) {
        id = setTimeout(() => setProgress((p) => p + 1), TYPE_SPEED);
      } else {
        id = setTimeout(() => setPhase('hold'), 0);
      }
    } else if (phase === 'hold') {
      id = setTimeout(() => {
        setProgress(0);
        setPhase('erasing');
      }, HOLD_FULL);
    } else {
      if (progress < totalLen) {
        id = setTimeout(() => setProgress((p) => p + 1), ERASE_SPEED);
      } else {
        id = setTimeout(() => {
          setPairIdx((i) => (i + 1) % ROLE_PAIRS.length);
          setProgress(0);
          setPhase('typing');
        }, HOLD_EMPTY);
      }
    }
    return () => clearTimeout(id);
  }, [phase, progress, totalLen]);

  return (
    <span className="whitespace-pre">
      {text.split('').map((c, i) => {
        const visible =
          phase === 'typing' ? i < progress :
          phase === 'hold' ? true :
          i >= progress;
        const isBracket = c === '>' || c === '<';
        return (
          <span
            key={`${pairIdx}-${i}`}
            className={isBracket ? 'text-aura-vital-mid' : ''}
            style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
          >
            {c}
          </span>
        );
      })}
    </span>
  );
}

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
  { icon: <FiCode />, target: 115000, suffix: '+', labelKey: 'aboutLines', aura: 'vital' },
  { icon: <FiCpu />, target: 4, suffix: '', labelKey: 'aboutApps', aura: 'aether' },
  { icon: <FiGlobe />, target: 6, suffix: '', labelKey: 'aboutLangs', aura: 'flow' },
  { icon: <FiAward />, target: 3000, suffix: '+', labelKey: 'aboutCommits', aura: 'aether' },
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
      className="relative px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-24 pb-32 md:pt-12 md:pb-16 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-5 md:gap-4">

        {/* Greeting */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="block text-center font-mono text-sm sm:text-base uppercase tracking-[0.32em] text-text-secondary"
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

        {/* Hero name — Adrian wycentrowane wzgledem Runiewicza dzieki text-center na h1 */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-display font-normal tracking-tight leading-[1.02] text-center text-[clamp(3.25rem,12vw,5.5rem)]"
        >
          <span className="text-text-primary block">Adrian</span>
          <span className="aura-text-aether block">Runiewicz</span>
        </motion.h1>

        {/* Typing roles — para ról pojawia/znika literka po literce, lewo→prawo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary min-h-[2rem] md:min-h-[2.25rem] flex items-center justify-center"
        >
          <TypingRoles />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="font-body text-base sm:text-lg md:text-base lg:text-lg text-text-secondary leading-snug md:leading-relaxed max-w-3xl mx-auto text-center md:mt-3"
        >
          {t('heroDesc')}
        </motion.p>

        {/* Counters — 2x2 mobile, 4x1 desktop, ikona po lewej / cyfry po prawej. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto md:mt-10"
        >
          {counters.map((c) => {
            const s = counterAuraStyles[c.aura];
            return (
              <div
                key={c.labelKey}
                className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-2xl py-3 px-4 md:py-2.5 md:px-4 transition-all duration-500 ${s.border}`}
                style={{ boxShadow: s.shadow }}
              >
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 blur-3xl rounded-full transition-colors duration-500 ${s.blob}`}
                />
                <div className="relative flex items-center justify-between gap-3">
                  <span className={`text-3xl md:text-3xl shrink-0 ${s.iconColor}`}>{c.icon}</span>
                  <div className="flex flex-col items-end gap-1 min-w-0">
                    <span className="font-display text-3xl md:text-[2rem] font-semibold text-text-primary leading-none">
                      <AnimatedCounter target={c.target} suffix={c.suffix} />
                    </span>
                    <span className={`font-mono text-[10px] md:text-xs uppercase tracking-wider leading-snug text-right ${s.iconColor}`}>
                      {t(c.labelKey)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
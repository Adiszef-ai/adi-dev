import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

interface Stat {
  value: string;
  label: string;
  aura: 'aether' | 'vital' | 'flow' | 'info';
}

export default function Hero() {
  const { t } = useLang();

  const stats: Stat[] = [
    { value: '4', label: t('projectsLive'), aura: 'aether' },
    { value: '1.5', label: t('yearsAI'), aura: 'vital' },
    { value: '5+', label: t('languages'), aura: 'flow' },
    { value: 'AI', label: t('enthusiast'), aura: 'info' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 lg:px-28 xl:px-36 pt-20 md:pt-16 pb-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl">
        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-glass backdrop-blur-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            {t('aboutAvailable')}
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="block font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-4"
        >
          {t('greeting')}
        </motion.span>

        {/* Hero name with aura shimmer */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight leading-[1.05] mb-2"
        >
          <span className="text-text-primary">Adrian</span>
          <br />
          <span className="aura-text-aether">Runiewicz</span>
        </motion.h1>

        {/* Typing — secondary role rotation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="font-mono text-base md:text-lg text-text-secondary h-8 flex items-center gap-2 mb-8"
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
          className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mb-10"
        >
          {t('heroDesc')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 aura-bg-vital text-bg-deep font-mono text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-[0_0_30px_-5px_rgba(232,121,249,0.4)] hover:shadow-[0_0_50px_-5px_rgba(232,121,249,0.7)] transition-shadow duration-300"
            style={{ backgroundSize: '200% auto' }}
          >
            {t('viewProjects')}
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-border-strong text-text-primary font-mono text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full hover:border-aura-aether-mid/60 hover:bg-bg-glass transition-colors duration-300"
          >
            <FiMail />
            {t('contact')}
          </a>
        </motion.div>

        {/* Bento stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ value, label, aura }: Stat) {
  const auraGlowClass = {
    aether: 'bg-aura-aether-start/20 group-hover:bg-aura-aether-mid/40',
    vital: 'bg-aura-vital-start/20 group-hover:bg-aura-vital-mid/40',
    flow: 'bg-aura-flow-start/20 group-hover:bg-aura-flow-mid/40',
    info: 'bg-info/15 group-hover:bg-info/35',
  }[aura];

  const borderHover = {
    aether: 'hover:border-aura-aether-mid/40',
    vital: 'hover:border-aura-vital-mid/40',
    flow: 'hover:border-aura-flow-mid/40',
    info: 'hover:border-info/40',
  }[aura];

  return (
    <div
      className={`group relative overflow-hidden bg-bg-surface/60 backdrop-blur-sm border border-border-subtle rounded-2xl p-4 md:p-5 transition-all duration-500 ${borderHover}`}
    >
      <div
        className={`absolute -right-4 -top-4 w-20 h-20 blur-2xl rounded-full transition-colors duration-500 ${auraGlowClass}`}
      />
      <div className="relative">
        <div className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-1">
          {value}
        </div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-muted">
          {label}
        </div>
      </div>
    </div>
  );
}

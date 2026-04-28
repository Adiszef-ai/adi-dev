import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiChevronDown } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' as const },
  }),
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
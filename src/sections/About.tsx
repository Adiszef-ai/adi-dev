import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="relative px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 md:gap-8">

        {/* Section header — wycentrowane na tej samej osi co Hero (centerX 804) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="block font-mono text-sm sm:text-base uppercase tracking-[0.3em] font-semibold text-text-secondary mb-4 md:mb-5">
            {t('aboutLabel')}
          </span>
          <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="aura-text-flow">{t('aboutTitle')}</span>
          </h2>
        </motion.div>

        {/* Narrative — 3 paragrafy, wycentrowane na osi Hero, większe odstępy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col gap-4 md:gap-5 max-w-3xl mx-auto text-left md:text-center"
        >
          {/* Lead — subtelnie wyróżniony: jaśniejszy + lekko większy, ale nie konkuruje z h2 */}
          <p className="text-lg sm:text-xl md:text-xl text-text-primary leading-relaxed">
            {t('aboutP1')}
          </p>
          <p className="text-base sm:text-lg md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP2')}
          </p>
          <p className="text-base sm:text-lg md:text-lg text-text-secondary leading-relaxed">
            {t('aboutP3')}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

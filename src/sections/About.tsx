import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';

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

      </div>
    </section>
  );
}

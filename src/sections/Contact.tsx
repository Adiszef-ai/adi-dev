import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

const socialCards = [
  {
    href: 'https://github.com/Adiszef-ai',
    icon: <FiGithub />,
    label: 'GitHub',
    value: '@Adiszef-ai',
    aura: 'aether' as const,
  },
  {
    href: 'https://www.linkedin.com/in/adrian-runiewicz-4a3759259/',
    icon: <FiLinkedin />,
    label: 'LinkedIn',
    value: 'Adrian Runiewicz',
    aura: 'vital' as const,
  },
  {
    href: 'mailto:kontakt@adrianruniewicz.pl',
    icon: <FiMail />,
    label: 'Email',
    valueKey: 'contactEmail',
    aura: 'flow' as const,
  },
];

const auraStyles = {
  aether: {
    iconBg: 'bg-aura-aether-mid/15 text-aura-aether-mid',
    border: 'hover:border-aura-aether-mid/40',
    blob: 'bg-aura-aether-mid/20 group-hover:bg-aura-aether-mid/35',
    shadow: '0 0 25px -10px rgb(99 102 241 / 0.2)',
  },
  vital: {
    iconBg: 'bg-aura-vital-mid/15 text-aura-vital-mid',
    border: 'hover:border-aura-vital-mid/40',
    blob: 'bg-aura-vital-mid/20 group-hover:bg-aura-vital-mid/35',
    shadow: '0 0 25px -10px rgb(232 121 249 / 0.2)',
  },
  flow: {
    iconBg: 'bg-aura-flow-mid/15 text-aura-flow-mid',
    border: 'hover:border-aura-flow-mid/40',
    blob: 'bg-aura-flow-mid/20 group-hover:bg-aura-flow-mid/35',
    shadow: '0 0 25px -10px rgb(244 114 182 / 0.2)',
  },
};

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center md:pr-32 lg:pr-48"
      >
        <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.32em] text-text-muted mb-5 md:mb-6">
          {t('contactLabel')}
        </span>
        <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05] mb-3">
          <span className="aura-text-vital">{t('contactTitle')}</span>
        </h2>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {t('contactSubtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        <ContactForm />

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-1">
            {t('formOrContact')}
          </p>

          {socialCards.map((card, i) => {
            const s = auraStyles[card.aura];
            return (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('mailto') ? undefined : '_blank'}
                rel={card.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`group relative overflow-hidden flex items-center gap-4 bg-bg-surface/50 backdrop-blur-sm border border-border-subtle rounded-2xl p-4 transition-all duration-300 ${s.border}`}
                style={{ boxShadow: s.shadow }}
              >
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 blur-3xl rounded-full pointer-events-none transition-colors duration-500 ${s.blob}`}
                />
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl text-xl ${s.iconBg}`}>
                  {card.icon}
                </div>
                <div className="relative flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {card.label}
                  </span>
                  <span className="text-text-primary font-medium">
                    {card.valueKey ? t(card.valueKey) : card.value}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const { t } = useLang();

  return (
    <section id="contact" className="contact">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('contactLabel')}</span>
        <h2 className="section-title">{t('contactTitle')}</h2>
        <p className="contact__subtitle">{t('contactSubtitle')}</p>
      </motion.div>

      <ContactForm />

      <p className="contact__or">{t('formOrContact')}</p>

      <motion.div
        className="contact__links"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href="https://github.com/Adiszef-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__card"
        >
          <FiGithub className="contact__card-icon" />
          <span className="contact__card-label">GitHub</span>
          <span className="contact__card-value">@Adiszef-ai</span>
        </a>

        <a
          href="https://www.linkedin.com/in/adrian-runiewicz-4a3759259/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__card"
        >
          <FiLinkedin className="contact__card-icon" />
          <span className="contact__card-label">LinkedIn</span>
          <span className="contact__card-value">Adrian Runiewicz</span>
        </a>

        <a href="mailto:kontakt@adrianruniewicz.pl" className="contact__card">
          <FiMail className="contact__card-icon" />
          <span className="contact__card-label">Email</span>
          <span className="contact__card-value">{t('contactEmail')}</span>
        </a>
      </motion.div>
    </section>
  );
}

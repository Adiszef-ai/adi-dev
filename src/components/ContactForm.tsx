import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // EmailJS - user needs to configure their own keys
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!emailjsPublicKey || !emailjsServiceId || !emailjsTemplateId) {
        // Fallback: open mailto
        window.location.href = `mailto:kontakt@adrianruniewicz.pl?subject=Portfolio Contact: ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;
        setStatus('success');
        return;
      }

      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        emailjsPublicKey
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label className="contact-form__label">{t('formName')}</label>
          <input
            type="text"
            className="contact-form__input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder={t('formNamePh')}
          />
        </div>
        <div className="contact-form__field">
          <label className="contact-form__label">Email</label>
          <input
            type="email"
            className="contact-form__input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder={t('formEmailPh')}
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label">{t('formMessage')}</label>
        <textarea
          className="contact-form__input contact-form__textarea"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          placeholder={t('formMessagePh')}
        />
      </div>

      <button
        type="submit"
        className={`btn btn--primary contact-form__submit ${status === 'success' ? 'contact-form__submit--success' : ''}`}
        disabled={status === 'sending'}
      >
        {status === 'idle' && <><FiSend /> {t('formSend')}</>}
        {status === 'sending' && <>{t('formSending')}...</>}
        {status === 'success' && <><FiCheck /> {t('formSent')}</>}
        {status === 'error' && <><FiAlertCircle /> {t('formError')}</>}
      </button>
    </motion.form>
  );
}

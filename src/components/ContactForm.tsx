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
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!emailjsPublicKey || !emailjsServiceId || !emailjsTemplateId) {
        window.location.href = `mailto:adiszefai@gmail.com?subject=Portfolio Contact: ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;
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

  const inputClass =
    'w-full bg-bg-elevated/40 border border-border-subtle rounded-2xl px-4 py-3 text-text-primary placeholder:text-text-muted font-body text-base focus:outline-none focus:border-aura-vital-mid/60 focus:ring-2 focus:ring-aura-vital-mid/20 transition-all duration-200';

  const labelClass =
    'block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2';

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-8 flex flex-col gap-5"
      style={{ boxShadow: '0 0 40px -15px rgb(232 121 249 / 0.2)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('formName')}</label>
          <input
            type="text"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder={t('formNamePh')}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            placeholder={t('formEmailPh')}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t('formMessage')}</label>
        <textarea
          className={`${inputClass} resize-y min-h-[140px]`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          placeholder={t('formMessagePh')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start group inline-flex items-center gap-2 aura-bg-vital text-bg-deep font-mono text-sm font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-[0_0_30px_-5px_rgb(232_121_249/0.4)] hover:shadow-[0_0_50px_-5px_rgb(232_121_249/0.7)] transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundSize: '200% auto' }}
      >
        {status === 'idle' && (
          <>
            <FiSend />
            {t('formSend')}
          </>
        )}
        {status === 'sending' && <>{t('formSending')}...</>}
        {status === 'success' && (
          <>
            <FiCheck /> {t('formSent')}
          </>
        )}
        {status === 'error' && (
          <>
            <FiAlertCircle /> {t('formError')}
          </>
        )}
      </button>
    </motion.form>
  );
}

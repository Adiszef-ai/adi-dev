import { useLang } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="px-8 md:px-20 lg:px-28 xl:px-36 py-10 border-t border-border-subtle">
      <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-muted text-center">
        {t('footer')}
      </div>
    </footer>
  );
}

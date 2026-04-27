import { useLang } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  return <footer className="footer">{t('footer')}</footer>;
}

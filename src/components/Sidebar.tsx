import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHome, FiUser, FiFolder, FiMail, FiClock, FiBarChart2, FiCpu, FiTarget, FiAward, FiLayers, FiGlobe, FiSun, FiMoon } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSidebar } from '../contexts/SidebarContext';

const sectionIds = ['hero', 'about', 'timeline', 'skills', 'radar', 'projects', 'analyses', 'agents', 'certs', 'contact'];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { open, close } = useSidebar();

  useEffect(() => {
    const main = document.querySelector('.main');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: main, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { icon: <FiHome />, label: t('navHome'), href: '#hero', id: 'hero' },
    { icon: <FiUser />, label: t('aboutLabel'), href: '#about', id: 'about' },
    { icon: <FiClock />, label: t('timelineLabel'), href: '#timeline', id: 'timeline' },
    { icon: <FiLayers />, label: t('skillsLabel'), href: '#skills', id: 'skills' },
    { icon: <FiTarget />, label: t('radarLabel'), href: '#radar', id: 'radar' },
    { icon: <FiFolder />, label: t('navProjects'), href: '#projects', id: 'projects' },
    { icon: <FiBarChart2 />, label: t('analysesLabel'), href: '#analyses', id: 'analyses' },
    { icon: <FiCpu />, label: t('agentsLabel'), href: '#agents', id: 'agents' },
    { icon: <FiAward />, label: t('certsLabel'), href: '#certs', id: 'certs' },
    { icon: <FiMail />, label: t('navContact'), href: '#contact', id: 'contact' },
  ];

  const isDark = theme === 'dark';
  const langOpposite = lang === 'pl' ? 'EN' : 'PL';
  const themeOpposite = isDark ? 'light' : 'dark';

  const settingsTileClass =
    'group flex items-center justify-center gap-2 px-3 py-3 rounded-lg border ' +
    'bg-white/[0.03] border-border-subtle text-text-secondary ' +
    'hover:bg-white/[0.06] hover:border-border-strong hover:text-text-primary ' +
    'font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300';

  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? 'sidebar-backdrop--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav className={`sidebar ${open ? 'sidebar--open' : ''} flex flex-col gap-4 p-5 pb-[88px] md:pb-5`}>
        {/* A: Brand */}
        <div className="flex flex-col items-center gap-3 pb-1">
          <div className="relative w-[150px] h-[150px] rounded-2xl p-[2px] aura-bg-aether shadow-[0_0_36px_-8px_rgb(99_102_241/0.6)]">
            <div className="w-full h-full rounded-[14px] bg-bg-deep flex items-center justify-center font-display text-5xl font-semibold text-text-primary">
              AR
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-center">
            <span className="text-base md:text-lg font-semibold text-text-primary leading-tight">Adrian Runiewicz</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
              DATA / AI
            </span>
          </div>
        </div>

        {/* B: Nav — grid 2-col mobile, vertical list desktop */}
        <ul className="flex-1 min-h-0 overflow-y-auto grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1.5 content-start">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    const main = document.querySelector('.main') as HTMLElement | null;
                    if (target && main) {
                      main.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                      history.replaceState(null, '', item.href);
                    }
                    close();
                  }}
                  className={`group flex items-center gap-2.5 px-3 py-3 md:py-2.5 rounded-lg border font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive
                      ? 'text-aura-aether-mid bg-aura-aether-mid/10 border-aura-aether-mid/30 shadow-[0_0_15px_-5px_rgb(99_102_241/0.4)]'
                      : 'text-text-muted bg-white/[0.03] border-border-subtle hover:text-text-primary hover:bg-white/[0.06] hover:border-border-strong'
                  }`}
                >
                  <span className={`text-lg transition-colors duration-300 ${isActive ? 'text-aura-aether-mid' : 'group-hover:text-aura-aether-start'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* C: Settings — lang + theme, grid 2-col always */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border-subtle">
          <button
            onClick={toggleLang}
            title={`Switch to ${langOpposite === 'EN' ? 'English' : 'Polish'}`}
            aria-label={`Switch to ${langOpposite === 'EN' ? 'English' : 'Polish'}`}
            className={settingsTileClass}
          >
            <FiGlobe className="text-base shrink-0" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {lang.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={toggleTheme}
            title={`Switch to ${themeOpposite} theme`}
            aria-label={`Switch to ${themeOpposite} theme`}
            className={settingsTileClass}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                {isDark ? <FiSun className="text-base shrink-0" /> : <FiMoon className="text-base shrink-0" />}
                <span>{isDark ? 'DARK' : 'LIGHT'}</span>
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </>
  );
}
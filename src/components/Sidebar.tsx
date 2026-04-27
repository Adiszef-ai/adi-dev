import { useState, useEffect } from 'react';
import { FiUser, FiFolder, FiMail, FiMenu, FiX, FiSun, FiMoon, FiClock, FiBarChart2, FiCpu, FiInfo, FiTarget, FiAward } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const sectionIds = ['hero', 'about', 'timeline', 'projects', 'radar', 'analyses', 'agents', 'certs', 'contact'];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { icon: <FiUser />, label: t('navAbout'), href: '#hero', id: 'hero' },
    { icon: <FiInfo />, label: t('aboutLabel'), href: '#about', id: 'about' },
    { icon: <FiClock />, label: t('timelineLabel'), href: '#timeline', id: 'timeline' },
    { icon: <FiFolder />, label: t('navProjects'), href: '#projects', id: 'projects' },
    { icon: <FiTarget />, label: 'TECH RADAR', href: '#radar', id: 'radar' },
    { icon: <FiBarChart2 />, label: t('analysesLabel'), href: '#analyses', id: 'analyses' },
    { icon: <FiCpu />, label: t('agentsLabel'), href: '#agents', id: 'agents' },
    { icon: <FiAward />, label: t('certsLabel'), href: '#certs', id: 'certs' },
    { icon: <FiMail />, label: t('navContact'), href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <FiX /> : <FiMenu />}
      </button>

      <div
        className={`sidebar-backdrop ${open ? 'sidebar-backdrop--visible' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <nav className={`sidebar ${open ? 'sidebar--open' : ''}`}>
            <div className="sidebar__logo">
              <div className="sidebar__logo-icon">AR</div>
              <div className="sidebar__logo-text">
                <span className="sidebar__name">Adrian Runiewicz</span>
                <span className="sidebar__role">DATA / AI</span>
              </div>
            </div>

            <ul className="sidebar__nav">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`sidebar__link ${activeSection === item.id ? 'sidebar__link--active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar__icon">{item.icon}</span>
                    <span className="sidebar__label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="sidebar__controls">
              <button className="sidebar__control-btn" onClick={toggleLang} title="Language">
                {lang === 'pl' ? 'EN' : 'PL'}
              </button>
              <button className="sidebar__control-btn" onClick={toggleTheme} title="Theme">
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </div>

            <div className="sidebar__socials">
              <a
                href="https://github.com/Adiszef-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar__social-link"
              >
                GH
              </a>
              <a
                href="https://www.linkedin.com/in/adrian-runiewicz-4a3759259/"
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar__social-link"
              >
                IN
              </a>
            </div>
      </nav>
    </>
  );
}

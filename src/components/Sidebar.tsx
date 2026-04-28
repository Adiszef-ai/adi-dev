import { useState, useEffect } from 'react';
import { FiHome, FiUser, FiFolder, FiMail, FiClock, FiBarChart2, FiCpu, FiTarget, FiAward, FiGithub, FiLinkedin, FiLayers } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';
import { useSidebar } from '../contexts/SidebarContext';

const sectionIds = ['hero', 'about', 'timeline', 'skills', 'radar', 'projects', 'analyses', 'agents', 'certs', 'contact'];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const { lang, toggleLang, t } = useLang();
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

  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? 'sidebar-backdrop--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav className={`sidebar ${open ? 'sidebar--open' : ''} flex flex-col gap-6 p-6`}>
        {/* Logo + name */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-square rounded-2xl p-[2px] aura-bg-aether shadow-[0_0_30px_-8px_rgb(99_102_241/0.6)]">
            <div className="w-full h-full rounded-[14px] bg-bg-deep flex items-center justify-center font-display text-5xl font-semibold text-text-primary">
              AR
            </div>
          </div>
          <div className="flex flex-col leading-tight px-1">
            <span className="text-sm font-semibold text-text-primary">Adrian Runiewicz</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted mt-0.5">
              DATA / AI
            </span>
          </div>
        </div>

        {/* Nav — grid 2-col on mobile, vertical list on desktop */}
        <ul className="flex-1 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1.5 content-start">
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

        {/* Lang toggle (theme moved to bottom bar) */}
        <button
          onClick={toggleLang}
          title="Language"
          className="w-full flex items-center justify-center px-3 py-2 rounded-xl border border-border-subtle bg-bg-glass text-text-muted font-mono text-[11px] font-semibold hover:text-aura-vital-mid hover:border-aura-vital-mid/40 hover:bg-aura-vital-mid/8 transition-all duration-300"
        >
          {lang === 'pl' ? 'EN' : 'PL'}
        </button>

        {/* Socials */}
        <div className="flex gap-2">
          <a
            href="https://github.com/Adiszef-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle bg-bg-glass text-text-muted hover:text-aura-aether-mid hover:border-aura-aether-mid/40 hover:bg-aura-aether-mid/8 transition-all duration-300"
          >
            <FiGithub className="text-sm" />
            <span className="font-mono text-[10px] uppercase tracking-wider">GH</span>
          </a>
          <a
            href="https://www.linkedin.com/in/adrian-runiewicz-4a3759259/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle bg-bg-glass text-text-muted hover:text-aura-vital-mid hover:border-aura-vital-mid/40 hover:bg-aura-vital-mid/8 transition-all duration-300"
          >
            <FiLinkedin className="text-sm" />
            <span className="font-mono text-[10px] uppercase tracking-wider">IN</span>
          </a>
        </div>
      </nav>
    </>
  );
}

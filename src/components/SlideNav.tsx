import { useEffect, useState, useCallback } from 'react';
import { FiChevronUp, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { useSidebar } from '../contexts/SidebarContext';

function smoothScrollTo(el: HTMLElement, target: number, duration = 600) {
  const start = el.scrollTop;
  const delta = target - start;
  if (Math.abs(delta) < 1) return;
  const startTime = performance.now();
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    el.scrollTop = start + delta * easeInOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const SLIDE_IDS = [
  'hero',
  'about',
  'timeline',
  'skills',
  'radar',
  'projects',
  'analyses',
  'agents',
  'certs',
  'contact',
] as const;

export default function SlideNav() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { open: sidebarOpen, toggle: toggleSidebar } = useSidebar();

  const goToIdx = useCallback((idx: number) => {
    if (idx < 0 || idx >= SLIDE_IDS.length) return;
    const id = SLIDE_IDS[idx];
    const el = document.getElementById(id);
    const main = document.querySelector('.main') as HTMLElement | null;
    if (!el || !main) return;
    smoothScrollTo(main, el.offsetTop, 600);
    history.replaceState(null, '', `#${id}`);
  }, []);

  // Track current slide via IntersectionObserver scoped to .main scroll container
  useEffect(() => {
    const main = document.querySelector('.main');
    if (!main) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const bestEntry = intersecting.reduce((best, current) =>
          current.intersectionRatio > best.intersectionRatio ? current : best
        );
        const idx = SLIDE_IDS.indexOf(bestEntry.target.id as typeof SLIDE_IDS[number]);
        if (idx >= 0) setCurrentIdx(idx);
      },
      { root: main, threshold: [0.4, 0.6, 0.8] }
    );

    SLIDE_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Restore from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && SLIDE_IDS.includes(hash as typeof SLIDE_IDS[number])) {
      const idx = SLIDE_IDS.indexOf(hash as typeof SLIDE_IDS[number]);
      setTimeout(() => goToIdx(idx), 100);
    }
  }, [goToIdx]);

  // Keyboard nav (desktop)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToIdx(currentIdx + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToIdx(currentIdx - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToIdx(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToIdx(SLIDE_IDS.length - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIdx, goToIdx]);

  const isFirst = currentIdx === 0;
  const isLast = currentIdx === SLIDE_IDS.length - 1;

  return (
    <nav className="slide-nav" aria-label="Bottom navigation">
      <button
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarOpen}
        className="nav-btn"
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className="slide-nav__group">
        <button
          onClick={() => goToIdx(currentIdx - 1)}
          disabled={isFirst}
          aria-label="Previous slide"
          className="nav-btn"
        >
          <FiChevronUp />
        </button>
        <button
          onClick={() => goToIdx(currentIdx + 1)}
          disabled={isLast}
          aria-label="Next slide"
          className="nav-btn"
        >
          <FiChevronDown />
        </button>
      </div>
    </nav>
  );
}

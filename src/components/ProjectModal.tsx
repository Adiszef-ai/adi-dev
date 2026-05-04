import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiLock, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type Aura = 'aether' | 'vital' | 'flow';

export interface CaseStudy {
  images: string[];
  captionKeys: string[];
  descKey: string;
}

interface ModalProject {
  title: string;
  category: string;
  tech: string[];
  url?: string;
  github?: string;
  privateLabelKey?: string;
  aura: Aura;
  caseStudy: CaseStudy;
}

const auraAccent: Record<Aura, {
  border: string;
  shadow: string;
  text: string;
  bg: string;
  ring: string;
}> = {
  aether: {
    border: 'border-aura-aether-mid/40',
    shadow: '0 0 60px -15px rgb(99 102 241 / 0.5)',
    text: 'text-aura-aether-mid',
    bg: 'bg-aura-aether-mid/15',
    ring: 'ring-aura-aether-mid/60',
  },
  vital: {
    border: 'border-aura-vital-mid/40',
    shadow: '0 0 60px -15px rgb(232 121 249 / 0.5)',
    text: 'text-aura-vital-mid',
    bg: 'bg-aura-vital-mid/15',
    ring: 'ring-aura-vital-mid/60',
  },
  flow: {
    border: 'border-aura-flow-mid/40',
    shadow: '0 0 60px -15px rgb(244 114 182 / 0.5)',
    text: 'text-aura-flow-mid',
    bg: 'bg-aura-flow-mid/15',
    ring: 'ring-aura-flow-mid/60',
  },
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ModalProject | null;
  onClose: () => void;
}) {
  const { t } = useLang();
  const [currentImg, setCurrentImg] = useState(0);

  // Reset index when project changes
  useEffect(() => {
    setCurrentImg(0);
  }, [project?.title]);

  // ESC to close + arrow keys for gallery + body scroll lock
  useEffect(() => {
    if (!project) return;
    const totalImages = project.caseStudy.images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImg((i) => (i - 1 + totalImages) % totalImages);
      if (e.key === 'ArrowRight') setCurrentImg((i) => (i + 1) % totalImages);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  const a = project ? auraAccent[project.aura] : auraAccent.aether;
  const totalImages = project?.caseStudy.images.length ?? 0;
  const goPrev = () => setCurrentImg((i) => (i - 1 + totalImages) % totalImages);
  const goNext = () => setCurrentImg((i) => (i + 1) % totalImages);

  return (
    <AnimatePresence>
      {project && (
      <motion.div
        key="project-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[1500] flex items-center justify-center p-3 md:p-6 bg-bg-deep/85 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — case study`}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={`relative w-full max-w-6xl max-h-[92vh] bg-bg-surface border ${a.border} rounded-2xl overflow-hidden flex flex-col`}
          style={{ boxShadow: a.shadow }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border-subtle bg-bg-elevated/60 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] ${a.text} shrink-0`}>
                {project.category}
              </span>
              <span className="text-text-muted">·</span>
              <span className="font-display text-base md:text-lg font-semibold text-text-primary truncate">
                {project.title}
              </span>
              {project.privateLabelKey && (
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-text-muted border border-dashed border-border-subtle rounded-md px-2 py-0.5 ml-1">
                  <FiLock className="text-[10px]" /> {t(project.privateLabelKey)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors shrink-0"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Body — split desktop, stack mobile */}
          <div className="flex flex-col lg:flex-row min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
            {/* Gallery (left ~65%) */}
            <div className="relative lg:w-[64%] shrink-0 bg-bg-deep flex flex-col">
              {/* Main image — group/img dla hover-fade strzałek */}
              <div className="group/img relative w-full aspect-[7/4] bg-bg-deep overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={project.caseStudy.images[currentImg]}
                    src={project.caseStudy.images[currentImg]}
                    alt={t(project.caseStudy.captionKeys[currentImg])}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                {/* Prev/Next arrows — invisible default, fade-in on image hover (desktop). Mobile: thumbs są primary nav. */}
                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label="Poprzedni obraz"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-bg-deep/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary opacity-0 group-hover/img:opacity-100 hover:bg-bg-deep/85 hover:border-border-strong transition-all duration-200 flex items-center justify-center text-sm"
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label="Następny obraz"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-bg-deep/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary opacity-0 group-hover/img:opacity-100 hover:bg-bg-deep/85 hover:border-border-strong transition-all duration-200 flex items-center justify-center text-sm"
                    >
                      <FiChevronRight />
                    </button>
                  </>
                )}
                {/* Counter — mniejszy, w rogu (tylko gdy >1 obraz) */}
                {totalImages > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-bg-deep/60 backdrop-blur-sm border border-border-subtle/50 font-mono text-[9px] uppercase tracking-wider text-text-secondary/85">
                    {currentImg + 1} / {totalImages}
                  </div>
                )}
              </div>

              {/* Caption + thumbs (thumbs tylko gdy >1 obraz) */}
              <div className="px-4 md:px-5 py-3 border-t border-border-subtle bg-bg-surface/40">
                <p className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] ${a.text} ${totalImages > 1 ? 'mb-3' : ''}`}>
                  {t(project.caseStudy.captionKeys[currentImg])}
                </p>
                {totalImages > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {project.caseStudy.images.map((img, i) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setCurrentImg(i)}
                        aria-label={`Obraz ${i + 1}`}
                        aria-current={i === currentImg ? 'true' : undefined}
                        className={`relative aspect-[7/4] rounded-md overflow-hidden border transition-all duration-200 ${
                          i === currentImg
                            ? `border-transparent ring-2 ${a.ring}`
                            : 'border-border-subtle opacity-55 hover:opacity-100 hover:border-border-strong'
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Description (right ~36%) */}
            <div className="lg:w-[36%] lg:overflow-y-auto p-5 md:p-7 flex flex-col gap-4">
              <div>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {t(project.caseStudy.descKey)}
                </p>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded-md border border-border-subtle ${a.bg} font-mono text-[10px] text-text-secondary`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.url || project.github) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-md border ${a.border} ${a.bg} ${a.text} hover:bg-bg-elevated transition-colors`}
                    >
                      <FiExternalLink /> Open App
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-md border border-border-strong text-text-primary hover:bg-bg-elevated transition-colors"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                </div>
              )}

              {project.privateLabelKey && (
                <div className="sm:hidden inline-flex items-center gap-1.5 self-start font-mono text-[10px] uppercase tracking-wider text-text-muted border border-dashed border-border-subtle rounded-md px-2.5 py-1">
                  <FiLock className="text-xs" /> {t(project.privateLabelKey)}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

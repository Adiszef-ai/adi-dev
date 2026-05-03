import { motion, AnimatePresence, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiMessageSquare, FiDatabase, FiZap, FiUser, FiTerminal, FiBookOpen, FiHeart, FiCompass, FiHash, FiVolume2 } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type NodeId = 'user' | 'classify' | 'runes' | 'myth' | 'advice' | 'chat' | 'kb' | 'voice';

interface NodeDef {
  id: NodeId;
  labelKey: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface EdgeDef {
  id: string;
  from: NodeId;
  to: NodeId;
  branch?: 'runes' | 'myth' | 'advice' | 'chat';
}

// Desktop layout — oryginalna wersja (USER góra-środek, VOICE dół-środek)
const nodesDesktop: NodeDef[] = [
  { id: 'user',     labelKey: 'agentNodeUser',     icon: <FiMessageSquare />, color: '#06b6d4', x: 50, y: 8 },
  { id: 'classify', labelKey: 'agentNodeClassify', icon: <FiCompass />,       color: '#8b5cf6', x: 50, y: 26 },
  { id: 'runes',    labelKey: 'agentNodeRunes',    icon: <FiHash />,          color: '#10b981', x: 14, y: 46 },
  { id: 'myth',     labelKey: 'agentNodeMyth',     icon: <FiBookOpen />,      color: '#e879f9', x: 38, y: 46 },
  { id: 'advice',   labelKey: 'agentNodeAdvice',   icon: <FiHeart />,         color: '#fb7185', x: 62, y: 46 },
  { id: 'chat',     labelKey: 'agentNodeChat',     icon: <FiZap />,           color: '#f59e0b', x: 86, y: 46 },
  { id: 'kb',       labelKey: 'agentNodeKB',       icon: <FiDatabase />,      color: '#22d3ee', x: 50, y: 68 },
  { id: 'voice',    labelKey: 'agentNodeVoice',    icon: <FiVolume2 />,       color: '#d946ef', x: 50, y: 88 },
];

// Mobile layout — USER lewo-góra, VOICE prawo-dół (lepsze rozłożenie na wąskim ekranie)
const nodesMobile: NodeDef[] = [
  { id: 'user',     labelKey: 'agentNodeUser',     icon: <FiMessageSquare />, color: '#06b6d4', x: 14, y: 8 },
  { id: 'classify', labelKey: 'agentNodeClassify', icon: <FiCompass />,       color: '#8b5cf6', x: 50, y: 26 },
  { id: 'runes',    labelKey: 'agentNodeRunes',    icon: <FiHash />,          color: '#10b981', x: 14, y: 46 },
  { id: 'myth',     labelKey: 'agentNodeMyth',     icon: <FiBookOpen />,      color: '#e879f9', x: 38, y: 46 },
  { id: 'advice',   labelKey: 'agentNodeAdvice',   icon: <FiHeart />,         color: '#fb7185', x: 62, y: 46 },
  { id: 'chat',     labelKey: 'agentNodeChat',     icon: <FiZap />,           color: '#f59e0b', x: 86, y: 46 },
  { id: 'kb',       labelKey: 'agentNodeKB',       icon: <FiDatabase />,      color: '#22d3ee', x: 50, y: 68 },
  { id: 'voice',    labelKey: 'agentNodeVoice',    icon: <FiVolume2 />,       color: '#d946ef', x: 86, y: 88 },
];

const edges: EdgeDef[] = [
  { id: 'user-classify',   from: 'user',     to: 'classify' },
  { id: 'classify-runes',  from: 'classify', to: 'runes',  branch: 'runes' },
  { id: 'classify-myth',   from: 'classify', to: 'myth',   branch: 'myth' },
  { id: 'classify-advice', from: 'classify', to: 'advice', branch: 'advice' },
  { id: 'classify-chat',   from: 'classify', to: 'chat',   branch: 'chat' },
  { id: 'runes-kb',        from: 'runes',    to: 'kb',     branch: 'runes' },
  { id: 'myth-kb',         from: 'myth',     to: 'kb',     branch: 'myth' },
  { id: 'advice-kb',       from: 'advice',   to: 'kb',     branch: 'advice' },
  { id: 'chat-kb',         from: 'chat',     to: 'kb',     branch: 'chat' },
  { id: 'kb-voice',        from: 'kb',       to: 'voice' },
];

function nodeById(nodesList: NodeDef[], id: NodeId): NodeDef {
  return nodesList.find((n) => n.id === id)!;
}

function bezierPath(from: NodeDef, to: NodeDef): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx1 = from.x + dx * 0.3;
  const cy1 = from.y + dy * 0.6;
  const cx2 = from.x + dx * 0.7;
  const cy2 = from.y + dy * 0.4;
  return `M ${from.x} ${from.y + 4} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y - 4}`;
}

interface TraceStep {
  activeNode: NodeId;
  edgeOut?: string;
  messageKey?: string;
  badge?: string;
  hold: number;
}

const tracePlan: TraceStep[] = [
  { activeNode: 'user',     edgeOut: 'user-classify',  messageKey: 'agentDemo1', badge: 'USER',         hold: 1100 },
  { activeNode: 'classify', edgeOut: 'classify-myth',  messageKey: 'agentDemo2', badge: 'CLASSIFIER',   hold: 1100 },
  { activeNode: 'myth',                                badge: 'BRANCH · MYTH',   hold: 700 },
  { activeNode: 'myth',     edgeOut: 'myth-kb',                                  hold: 700 },
  { activeNode: 'kb',       edgeOut: 'kb-voice',       messageKey: 'agentDemo3', badge: 'RAG',          hold: 1100 },
  { activeNode: 'voice',                               messageKey: 'agentDemo4', badge: 'TTS',          hold: 1100 },
  { activeNode: 'voice',                               messageKey: 'agentDemo5', badge: 'LOKI · PL',    hold: 4000 },
];

const ACTIVE_BRANCH: NonNullable<EdgeDef['branch']> = 'myth';

interface DemoMessage {
  key: string;
  text: string;
  badge: string;
  isFinal: boolean;
}

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

export default function Agents() {
  const { t } = useLang();
  const isDesktop = useIsDesktop();
  const visibleNodes = isDesktop ? nodesDesktop : nodesMobile;
  const [stepIdx, setStepIdx] = useState(-1);
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [sparkEdge, setSparkEdge] = useState<string | null>(null);
  const sparkOuterRef = useRef<SVGCircleElement>(null);
  const sparkInnerRef = useRef<SVGCircleElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const setSparkPos = (x: number, y: number, opacity: number) => {
    [sparkOuterRef.current, sparkInnerRef.current].forEach((c) => {
      if (!c) return;
      c.setAttribute('cx', String(x));
      c.setAttribute('cy', String(y));
      c.setAttribute('opacity', String(opacity));
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (stepIdx < 0 || stepIdx >= tracePlan.length) return;
    const step = tracePlan[stepIdx];

    if (step.messageKey) {
      const messageKey = step.messageKey;
      const isFinal = messageKey === 'agentDemo5';
      setMessages((prev) => [
        ...prev,
        {
          key: `${stepIdx}-${messageKey}`,
          text: t(messageKey),
          badge: step.badge ?? '',
          isFinal,
        },
      ]);
    }

    if (step.edgeOut) {
      setSparkEdge(step.edgeOut);
    } else {
      setSparkEdge(null);
      setSparkPos(0, 0, 0);
    }

    timeoutRef.current = window.setTimeout(() => {
      setStepIdx((i) => (i < tracePlan.length - 1 ? i + 1 : -1));
    }, step.hold);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [stepIdx, t]);

  useEffect(() => {
    if (!sparkEdge) return;
    const path = document.getElementById(`path-${sparkEdge}`) as SVGPathElement | null;
    if (!path) return;
    const length = path.getTotalLength();
    const start = path.getPointAtLength(0);
    setSparkPos(start.x, start.y, 1);
    const controls = animate(0, 1, {
      duration: 0.85,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (t) => {
        const pt = path.getPointAtLength(t * length);
        setSparkPos(pt.x, pt.y, 1);
      },
      onComplete: () => {
        if (sparkOuterRef.current) sparkOuterRef.current.setAttribute('opacity', '0');
        if (sparkInnerRef.current) sparkInnerRef.current.setAttribute('opacity', '0');
      },
    });
    return () => controls.stop();
  }, [sparkEdge]);

  const runDemo = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setMessages([]);
    setSparkEdge(null);
    setSparkPos(0, 0, 0);
    setStepIdx(0);
  };

  const isRunning = stepIdx >= 0 && stepIdx < tracePlan.length;
  const currentStep = isRunning ? tracePlan[stepIdx] : null;
  const activeNode = currentStep?.activeNode ?? null;

  return (
    <section
      id="agents"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-16"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-5 md:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <span className="block font-mono text-sm sm:text-base uppercase tracking-[0.3em] font-semibold text-text-secondary mb-4 md:mb-5">
          {t('agentsLabel')}
        </span>
        <h2 className="font-display text-[clamp(2.75rem,10vw,4.75rem)] md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="aura-text-vital">{t('agentsTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 md:gap-8">
        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-3 md:p-6"
          style={{ boxShadow: '0 0 40px -15px rgb(232 121 249 / 0.2)' }}
        >
          <div className="flex items-center justify-between mb-3 md:mb-4 px-2 md:px-0">
            <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">
              {t('agentArchitecture')}
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              {isRunning ? `STEP ${stepIdx + 1}/${tracePlan.length}` : 'IDLE'}
            </span>
          </div>

          <div className="relative aspect-[1/1.45] md:aspect-auto md:h-[440px] w-full">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {edges.map((edge) => {
                  const f = nodeById(visibleNodes, edge.from);
                  const tnode = nodeById(visibleNodes, edge.to);
                  return (
                    <path
                      key={edge.id}
                      id={`path-${edge.id}`}
                      d={bezierPath(f, tnode)}
                    />
                  );
                })}
              </defs>

              {edges.map((edge) => {
                const isDimmed = edge.branch && edge.branch !== ACTIVE_BRANCH;
                const isLive = sparkEdge === edge.id;
                return (
                  <use
                    key={`stroke-${edge.id}`}
                    href={`#path-${edge.id}`}
                    fill="none"
                    stroke={isLive ? '#e879f9' : 'rgba(168, 165, 184, 0.25)'}
                    strokeWidth={isLive ? '0.5' : '0.35'}
                    strokeDasharray={isLive ? 'none' : '1.4,1.2'}
                    opacity={isDimmed ? 0.25 : 1}
                    style={{ transition: 'stroke 200ms ease, opacity 300ms ease' }}
                  />
                );
              })}

              <circle
                ref={sparkOuterRef}
                r="1.8"
                fill="#fff"
                filter="url(#sparkGlow)"
                cx={0}
                cy={0}
                opacity={0}
              />
              <circle
                ref={sparkInnerRef}
                r="0.9"
                fill="#fff"
                cx={0}
                cy={0}
                opacity={0}
              />

              <defs>
                <filter id="sparkGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {visibleNodes.map((node) => {
              const isActive = activeNode === node.id;
              const isDimmed = node.id !== 'user' && node.id !== 'classify' && node.id !== 'kb' && node.id !== 'voice'
                && node.id !== ACTIVE_BRANCH;
              return (
                <motion.div
                  key={node.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    opacity: isDimmed && !isActive ? 0.35 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <motion.div
                    className="w-[52px] h-[52px] md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2"
                    style={{
                      background: 'rgba(20, 18, 32, 0.92)',
                      borderColor: isActive ? node.color : 'rgba(46, 42, 61, 0.85)',
                      color: node.color,
                    }}
                    animate={{
                      boxShadow: isActive
                        ? [
                            `0 0 14px -3px ${node.color}80`,
                            `0 0 28px -2px ${node.color}aa, 0 0 50px -10px ${node.color}55`,
                            `0 0 14px -3px ${node.color}80`,
                          ]
                        : `0 0 10px -4px ${node.color}40`,
                    }}
                    transition={{ duration: 1.4, repeat: isActive ? Infinity : 0 }}
                  >
                    <span className="text-lg md:text-lg">{node.icon}</span>
                  </motion.div>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.12em] md:tracking-[0.15em] whitespace-nowrap"
                    style={{ color: isActive ? node.color : 'rgba(168, 165, 184, 0.7)' }}
                  >
                    {t(node.labelKey)}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* URUCHOM — pod diagramem, wycentrowany, pulsujący gdy idle */}
          <div className="flex justify-center mt-3 md:mt-5">
            <motion.button
              type="button"
              onClick={runDemo}
              disabled={isRunning}
              animate={
                isRunning
                  ? { scale: 1, boxShadow: '0 0 0 0 rgba(232,121,249,0)' }
                  : {
                      scale: [1, 1.06, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(232,121,249,0)',
                        '0 0 0 14px rgba(232,121,249,0.18)',
                        '0 0 0 0 rgba(232,121,249,0)',
                      ],
                    }
              }
              transition={
                isRunning
                  ? { duration: 0.2 }
                  : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
              }
              whileHover={isRunning ? undefined : { scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 aura-bg-vital text-bg-deep font-mono text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-2.5 md:px-7 md:py-3.5 rounded-full shadow-[0_0_30px_-5px_rgb(232_121_249/0.55)] hover:shadow-[0_0_45px_-5px_rgb(232_121_249/0.9)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundSize: '200% auto' }}
            >
              {isRunning ? `${stepIdx + 1}/${tracePlan.length}` : t('agentRun')}
              {!isRunning && <FiArrowRight className="text-base md:text-lg" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Demo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-6 flex flex-col"
          style={{ boxShadow: '0 0 40px -15px rgb(99 102 241 / 0.2)' }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-4">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              <FiTerminal className="text-aura-aether-mid" />
              {t('agentDemoTitle')}
            </h3>
            {/* Mobile-only status — desktop ma to w headerze diagramu razem z buttonem URUCHOM */}
            <span className="md:hidden font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              {isRunning ? `STEP ${stepIdx + 1}/${tracePlan.length}` : 'IDLE'}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 min-h-[320px]">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.badge === 'USER';
                const accent = msg.isFinal
                  ? '#d946ef'
                  : isUser
                  ? '#06b6d4'
                  : '#8b5cf6';
                return (
                  <motion.div
                    key={msg.key}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-1.5 p-3 rounded-2xl border"
                    style={{
                      borderColor: `${accent}40`,
                      background: `${accent}0d`,
                    }}
                  >
                    <span
                      className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: accent }}
                    >
                      <span className="text-xs">{isUser ? <FiUser /> : msg.isFinal ? <FiVolume2 /> : <FiTerminal />}</span>
                      {msg.badge}
                    </span>
                    <p
                      className={`leading-relaxed ${
                        msg.isFinal
                          ? 'text-base text-text-primary italic'
                          : 'font-mono text-[12px] text-text-secondary'
                      }`}
                    >
                      {msg.text}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {!isRunning && messages.length === 0 && (
              <p className="font-mono text-xs text-text-muted italic mt-2">
                {t('agentClickRun')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-subtle">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${isRunning ? 'animate-ping bg-aura-vital-mid' : 'bg-success'}`}
              />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${isRunning ? 'bg-aura-vital-mid' : 'bg-success'}`} />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {t('agentStatus')}
            </span>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

import { motion, AnimatePresence, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FiArrowRight, FiMessageSquare, FiDatabase, FiZap, FiUser, FiTerminal,
  FiBookOpen, FiHeart, FiCompass, FiHash, FiVolume2,
  FiShield, FiPlus, FiCheck, FiCalendar, FiMic, FiSend, FiList,
} from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

type WorkflowId = 'thor' | 'n8n';

interface NodeDef {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface EdgeDef {
  id: string;
  from: string;
  to: string;
  branch?: string;
}

interface TraceStep {
  activeNode: string;
  edgeOut?: string;
  messageKey?: string;
  badge?: string;
  hold: number;
  isFinal?: boolean;
}

interface Workflow {
  id: WorkflowId;
  labelKey: string;
  archKey: string;
  statusKey: string;
  nodesDesktop: NodeDef[];
  nodesMobile: NodeDef[];
  edges: EdgeDef[];
  tracePlan: TraceStep[];
  activeBranch: string;
}

// ─────────────────────────────────────────────────────────────
// Workflow 1: Thor (RuneWitch) — voice-first conversational agent
// ─────────────────────────────────────────────────────────────

const thorNodesDesktop: NodeDef[] = [
  { id: 'user',     labelKey: 'agentNodeUser',     icon: <FiMessageSquare />, color: '#06b6d4', x: 50, y: 8 },
  { id: 'classify', labelKey: 'agentNodeClassify', icon: <FiCompass />,       color: '#8b5cf6', x: 50, y: 26 },
  { id: 'runes',    labelKey: 'agentNodeRunes',    icon: <FiHash />,          color: '#10b981', x: 14, y: 46 },
  { id: 'myth',     labelKey: 'agentNodeMyth',     icon: <FiBookOpen />,      color: '#e879f9', x: 38, y: 46 },
  { id: 'advice',   labelKey: 'agentNodeAdvice',   icon: <FiHeart />,         color: '#fb7185', x: 62, y: 46 },
  { id: 'chat',     labelKey: 'agentNodeChat',     icon: <FiZap />,           color: '#f59e0b', x: 86, y: 46 },
  { id: 'kb',       labelKey: 'agentNodeKB',       icon: <FiDatabase />,      color: '#22d3ee', x: 50, y: 68 },
  { id: 'voice',    labelKey: 'agentNodeVoice',    icon: <FiVolume2 />,       color: '#d946ef', x: 50, y: 88 },
];

const thorNodesMobile: NodeDef[] = [
  { id: 'user',     labelKey: 'agentNodeUser',     icon: <FiMessageSquare />, color: '#06b6d4', x: 14, y: 8 },
  { id: 'classify', labelKey: 'agentNodeClassify', icon: <FiCompass />,       color: '#8b5cf6', x: 50, y: 26 },
  { id: 'runes',    labelKey: 'agentNodeRunes',    icon: <FiHash />,          color: '#10b981', x: 14, y: 46 },
  { id: 'myth',     labelKey: 'agentNodeMyth',     icon: <FiBookOpen />,      color: '#e879f9', x: 38, y: 46 },
  { id: 'advice',   labelKey: 'agentNodeAdvice',   icon: <FiHeart />,         color: '#fb7185', x: 62, y: 46 },
  { id: 'chat',     labelKey: 'agentNodeChat',     icon: <FiZap />,           color: '#f59e0b', x: 86, y: 46 },
  { id: 'kb',       labelKey: 'agentNodeKB',       icon: <FiDatabase />,      color: '#22d3ee', x: 50, y: 68 },
  { id: 'voice',    labelKey: 'agentNodeVoice',    icon: <FiVolume2 />,       color: '#d946ef', x: 86, y: 88 },
];

const thorEdges: EdgeDef[] = [
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

const thorTracePlan: TraceStep[] = [
  { activeNode: 'user',     edgeOut: 'user-classify',  messageKey: 'agentDemo1', badge: 'USER',         hold: 1100 },
  { activeNode: 'classify', edgeOut: 'classify-myth',  messageKey: 'agentDemo2', badge: 'CLASSIFIER',   hold: 1100 },
  { activeNode: 'myth',                                badge: 'BRANCH · MYTH',   hold: 700 },
  { activeNode: 'myth',     edgeOut: 'myth-kb',                                  hold: 700 },
  { activeNode: 'kb',       edgeOut: 'kb-voice',       messageKey: 'agentDemo3', badge: 'RAG',          hold: 1100 },
  { activeNode: 'voice',                               messageKey: 'agentDemo4', badge: 'TTS',          hold: 1100 },
  { activeNode: 'voice',                               messageKey: 'agentDemo5', badge: 'LOKI · PL',    hold: 4000, isFinal: true },
];

// ─────────────────────────────────────────────────────────────
// Workflow 2: Telegram Ops (n8n) — event-driven multi-trigger
// ─────────────────────────────────────────────────────────────

const n8nNodesDesktop: NodeDef[] = [
  { id: 'tg-in',    labelKey: 'n8nNodeTgIn',    icon: <FiMessageSquare />, color: '#06b6d4', x: 50, y: 6 },
  { id: 'auth',     labelKey: 'n8nNodeAuth',    icon: <FiShield />,        color: '#8b5cf6', x: 50, y: 22 },
  { id: 'route',    labelKey: 'n8nNodeRoute',   icon: <FiCompass />,       color: '#f59e0b', x: 50, y: 38 },
  { id: 'add',      labelKey: 'n8nNodeAdd',     icon: <FiPlus />,          color: '#10b981', x: 14, y: 56 },
  { id: 'list',     labelKey: 'n8nNodeList',    icon: <FiList />,          color: '#22d3ee', x: 36, y: 56 },
  { id: 'done',     labelKey: 'n8nNodeDone',    icon: <FiCheck />,         color: '#84cc16', x: 58, y: 56 },
  { id: 'cal',      labelKey: 'n8nNodeCal',     icon: <FiCalendar />,      color: '#fb7185', x: 80, y: 56 },
  { id: 'voice',    labelKey: 'n8nNodeVoice',   icon: <FiMic />,           color: '#e879f9', x: 86, y: 72 },
  { id: 'whisper',  labelKey: 'n8nNodeWhisper', icon: <FiZap />,           color: '#a855f7', x: 64, y: 80 },
  { id: 'sheets',   labelKey: 'n8nNodeSheets',  icon: <FiDatabase />,      color: '#34d399', x: 30, y: 86 },
  { id: 'tg-out',   labelKey: 'n8nNodeTgOut',   icon: <FiSend />,          color: '#06b6d4', x: 50, y: 94 },
];

const n8nNodesMobile: NodeDef[] = [
  { id: 'tg-in',    labelKey: 'n8nNodeTgIn',    icon: <FiMessageSquare />, color: '#06b6d4', x: 50, y: 6 },
  { id: 'auth',     labelKey: 'n8nNodeAuth',    icon: <FiShield />,        color: '#8b5cf6', x: 50, y: 20 },
  { id: 'route',    labelKey: 'n8nNodeRoute',   icon: <FiCompass />,       color: '#f59e0b', x: 50, y: 36 },
  { id: 'add',      labelKey: 'n8nNodeAdd',     icon: <FiPlus />,          color: '#10b981', x: 12, y: 52 },
  { id: 'list',     labelKey: 'n8nNodeList',    icon: <FiList />,          color: '#22d3ee', x: 36, y: 52 },
  { id: 'done',     labelKey: 'n8nNodeDone',    icon: <FiCheck />,         color: '#84cc16', x: 60, y: 52 },
  { id: 'cal',      labelKey: 'n8nNodeCal',     icon: <FiCalendar />,      color: '#fb7185', x: 84, y: 52 },
  { id: 'voice',    labelKey: 'n8nNodeVoice',   icon: <FiMic />,           color: '#e879f9', x: 84, y: 70 },
  { id: 'whisper',  labelKey: 'n8nNodeWhisper', icon: <FiZap />,           color: '#a855f7', x: 60, y: 80 },
  { id: 'sheets',   labelKey: 'n8nNodeSheets',  icon: <FiDatabase />,      color: '#34d399', x: 28, y: 86 },
  { id: 'tg-out',   labelKey: 'n8nNodeTgOut',   icon: <FiSend />,          color: '#06b6d4', x: 50, y: 94 },
];

const n8nEdges: EdgeDef[] = [
  { id: 'tgin-auth',     from: 'tg-in',   to: 'auth' },
  { id: 'auth-route',    from: 'auth',    to: 'route' },
  { id: 'route-add',     from: 'route',   to: 'add',     branch: 'add' },
  { id: 'route-list',    from: 'route',   to: 'list',    branch: 'list' },
  { id: 'route-done',    from: 'route',   to: 'done',    branch: 'done' },
  { id: 'route-cal',     from: 'route',   to: 'cal',     branch: 'cal' },
  { id: 'route-voice',   from: 'route',   to: 'voice',   branch: 'voice' },
  { id: 'voice-whisper', from: 'voice',   to: 'whisper', branch: 'voice' },
  { id: 'add-sheets',    from: 'add',     to: 'sheets',  branch: 'add' },
  { id: 'done-sheets',   from: 'done',    to: 'sheets',  branch: 'done' },
  { id: 'whisper-sheets',from: 'whisper', to: 'sheets',  branch: 'voice' },
  { id: 'sheets-tgout',  from: 'sheets',  to: 'tg-out' },
];

const n8nTracePlan: TraceStep[] = [
  { activeNode: 'tg-in',   edgeOut: 'tgin-auth',     messageKey: 'n8nDemo1', badge: 'TELEGRAM',          hold: 1100 },
  { activeNode: 'auth',    edgeOut: 'auth-route',                            badge: 'AUTH ✓',            hold: 700 },
  { activeNode: 'route',   edgeOut: 'route-voice',   messageKey: 'n8nDemo2', badge: 'ROUTE',             hold: 1100 },
  { activeNode: 'voice',   edgeOut: 'voice-whisper',                         badge: 'BRANCH · VOICE',    hold: 700 },
  { activeNode: 'whisper', edgeOut: 'whisper-sheets',messageKey: 'n8nDemo3', badge: 'WHISPER STT',       hold: 1300 },
  { activeNode: 'sheets',  edgeOut: 'sheets-tgout',  messageKey: 'n8nDemo4', badge: 'SHEETS · APPEND',   hold: 1100 },
  { activeNode: 'tg-out',                            messageKey: 'n8nDemo5', badge: 'CONFIRM ✅',         hold: 4000, isFinal: true },
];

const workflows: Record<WorkflowId, Workflow> = {
  thor: {
    id: 'thor',
    labelKey: 'agentTabThor',
    archKey: 'agentArchitecture',
    statusKey: 'agentStatus',
    nodesDesktop: thorNodesDesktop,
    nodesMobile: thorNodesMobile,
    edges: thorEdges,
    tracePlan: thorTracePlan,
    activeBranch: 'myth',
  },
  n8n: {
    id: 'n8n',
    labelKey: 'agentTabN8n',
    archKey: 'agentN8nArchitecture',
    statusKey: 'n8nStatus',
    nodesDesktop: n8nNodesDesktop,
    nodesMobile: n8nNodesMobile,
    edges: n8nEdges,
    tracePlan: n8nTracePlan,
    activeBranch: 'voice',
  },
};

function nodeById(nodesList: NodeDef[], id: string): NodeDef {
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
  const [activeWorkflowId, setActiveWorkflowId] = useState<WorkflowId>('thor');
  const wf = workflows[activeWorkflowId];
  const visibleNodes = isDesktop ? wf.nodesDesktop : wf.nodesMobile;
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

  const resetDemo = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStepIdx(-1);
    setMessages([]);
    setSparkEdge(null);
    setSparkPos(0, 0, 0);
  };

  const selectWorkflow = (id: WorkflowId) => {
    if (id === activeWorkflowId) return;
    resetDemo();
    setActiveWorkflowId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (stepIdx < 0 || stepIdx >= wf.tracePlan.length) return;
    const step = wf.tracePlan[stepIdx];

    if (step.messageKey) {
      const messageKey = step.messageKey;
      setMessages((prev) => [
        ...prev,
        {
          key: `${activeWorkflowId}-${stepIdx}-${messageKey}`,
          text: t(messageKey),
          badge: step.badge ?? '',
          isFinal: step.isFinal ?? false,
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
      setStepIdx((i) => (i < wf.tracePlan.length - 1 ? i + 1 : -1));
    }, step.hold);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [stepIdx, t, wf.tracePlan, activeWorkflowId]);

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
    resetDemo();
    setStepIdx(0);
  };

  const isRunning = stepIdx >= 0 && stepIdx < wf.tracePlan.length;
  const currentStep = isRunning ? wf.tracePlan[stepIdx] : null;
  const activeNode = currentStep?.activeNode ?? null;

  return (
    <section
      id="agents"
      className="relative px-6 sm:px-10 md:px-20 lg:px-28 xl:px-36 pt-20 pb-32 md:py-16"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 md:gap-6">
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

      {/* Tab switcher — wybór workflow */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border-subtle bg-bg-surface/40 backdrop-blur-sm">
          {(Object.keys(workflows) as WorkflowId[]).map((id) => {
            const isActive = id === activeWorkflowId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectWorkflow(id)}
                className={`relative font-mono text-[10px] md:text-xs font-bold uppercase tracking-wider px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'aura-bg-vital text-bg-deep shadow-[0_0_20px_-5px_rgb(232_121_249/0.5)]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={isActive ? { backgroundSize: '200% auto' } : undefined}
              >
                {t(workflows[id].labelKey)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5 md:gap-6 max-w-5xl mx-auto w-full">
        {/* Diagram */}
        <motion.div
          key={`diagram-${activeWorkflowId}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-3 md:p-6"
          style={{ boxShadow: '0 0 40px -15px rgb(232 121 249 / 0.2)' }}
        >
          <div className="flex items-center justify-between mb-3 md:mb-4 px-2 md:px-0">
            <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted">
              {t(wf.archKey)}
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              {isRunning ? `STEP ${stepIdx + 1}/${wf.tracePlan.length}` : 'IDLE'}
            </span>
          </div>

          <div className="relative aspect-[1/1.45] md:aspect-auto md:h-[440px] w-full">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                {wf.edges.map((edge) => {
                  const f = nodeById(visibleNodes, edge.from);
                  const tnode = nodeById(visibleNodes, edge.to);
                  return (
                    <path
                      key={`${activeWorkflowId}-${edge.id}`}
                      id={`path-${edge.id}`}
                      d={bezierPath(f, tnode)}
                    />
                  );
                })}
              </defs>

              {wf.edges.map((edge) => {
                const isDimmed = edge.branch && edge.branch !== wf.activeBranch;
                const isLive = sparkEdge === edge.id;
                return (
                  <use
                    key={`stroke-${activeWorkflowId}-${edge.id}`}
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
              // Dim only branch nodes (not in active branch path) — generic across workflows
              const branchNodeIds = wf.edges
                .filter((e) => e.branch && e.branch !== wf.activeBranch)
                .flatMap((e) => [e.from, e.to])
                .filter((id) => !wf.edges.some((e) => !e.branch && (e.from === id || e.to === id)));
              const isDimmed = branchNodeIds.includes(node.id) && !isActive;
              return (
                <motion.div
                  key={`${activeWorkflowId}-${node.id}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  animate={{
                    scale: isActive ? 1.12 : 1,
                    opacity: isDimmed && !isActive ? 0.35 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <motion.div
                    className={`w-[52px] h-[52px] md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 bg-bg-elevated ${isActive ? '' : 'border-border-strong'}`}
                    style={{
                      color: node.color,
                      ...(isActive ? { borderColor: node.color } : {}),
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
              className="inline-flex items-center gap-2 aura-bg-vital text-bg-deep font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_0_25px_-5px_rgb(232_121_249/0.55)] hover:shadow-[0_0_40px_-5px_rgb(232_121_249/0.9)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundSize: '200% auto' }}
            >
              {isRunning ? `${stepIdx + 1}/${wf.tracePlan.length}` : t('agentRun')}
              {!isRunning && <FiArrowRight className="text-sm md:text-base" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Demo */}
        <motion.div
          key={`demo-${activeWorkflowId}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-6 flex flex-col"
          style={{ boxShadow: '0 0 40px -15px rgb(99 102 241 / 0.2)' }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-4">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              <FiTerminal className="text-aura-aether-mid" />
              {t('agentDemoTitle')}
            </h3>
            <span className="md:hidden font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              {isRunning ? `STEP ${stepIdx + 1}/${wf.tracePlan.length}` : 'IDLE'}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 min-h-[320px]">
            <AnimatePresence initial={false} key={activeWorkflowId}>
              {messages.map((msg) => {
                const isUser = msg.badge === 'USER' || msg.badge === 'TELEGRAM';
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
              {t(wf.statusKey)}
            </span>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

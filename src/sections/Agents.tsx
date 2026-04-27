import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCpu, FiArrowRight, FiMessageSquare, FiDatabase, FiGlobe, FiZap, FiUser, FiTerminal } from 'react-icons/fi';
import { useLang } from '../contexts/LanguageContext';

interface AgentNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface AgentFlow {
  from: string;
  to: string;
  label: string;
}

const agentNodes: AgentNode[] = [
  { id: 'user',       label: 'User',       icon: <FiMessageSquare />, color: '#22d3ee', x: 50, y: 10 },
  { id: 'supervisor', label: 'Supervisor', icon: <FiCpu />,           color: '#e879f9', x: 50, y: 40 },
  { id: 'researcher', label: 'Researcher', icon: <FiGlobe />,         color: '#34d399', x: 15, y: 75 },
  { id: 'analyzer',   label: 'Analyzer',   icon: <FiDatabase />,      color: '#6366f1', x: 50, y: 75 },
  { id: 'executor',   label: 'Executor',   icon: <FiZap />,           color: '#fbbf24', x: 85, y: 75 },
];

const agentFlows: AgentFlow[] = [
  { from: 'user',       to: 'supervisor', label: 'query' },
  { from: 'supervisor', to: 'researcher', label: 'research' },
  { from: 'supervisor', to: 'analyzer',   label: 'analyze' },
  { from: 'supervisor', to: 'executor',   label: 'execute' },
];

const demoMessages = [
  { role: 'user' as const, textKey: 'agentDemo1', icon: <FiUser /> },
  { role: 'agent' as const, textKey: 'agentDemo2', icon: <FiGlobe /> },
  { role: 'agent' as const, textKey: 'agentDemo3', icon: <FiDatabase /> },
  { role: 'agent' as const, textKey: 'agentDemo4', icon: <FiZap /> },
];

export default function Agents() {
  const { t } = useLang();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [demoStep, setDemoStep] = useState(0);

  const runDemo = () => {
    setDemoStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDemoStep(step);
      if (step >= demoMessages.length) clearInterval(interval);
    }, 1200);
  };

  return (
    <section
      id="agents"
      className="relative px-8 md:px-20 lg:px-28 xl:px-36 py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16"
      >
        <span className="block font-mono text-xs uppercase tracking-[0.3em] text-text-muted mb-3">
          {t('agentsLabel')}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="aura-text-vital">{t('agentsTitle')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-8"
          style={{ boxShadow: '0 0 40px -15px rgb(232 121 249 / 0.2)' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-6">
            {t('agentArchitecture')}
          </h3>

          <div className="relative aspect-[4/3] w-full">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 85">
              {agentFlows.map((flow) => {
                const from = agentNodes.find((n) => n.id === flow.from)!;
                const to = agentNodes.find((n) => n.id === flow.to)!;
                return (
                  <g key={`${flow.from}-${flow.to}`}>
                    <line
                      x1={from.x}
                      y1={from.y + 5}
                      x2={to.x}
                      y2={to.y - 5}
                      stroke="rgba(168, 165, 184, 0.25)"
                      strokeWidth="0.4"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 + 1}
                      fill="rgba(168, 165, 184, 0.6)"
                      fontSize="2.5"
                      textAnchor="middle"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {flow.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {agentNodes.map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <div
                  className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border-2 transition-all duration-300"
                  style={{
                    background: 'rgba(28, 26, 42, 0.8)',
                    borderColor: activeNode === node.id ? node.color : 'rgba(46, 42, 61, 0.8)',
                    boxShadow: activeNode === node.id
                      ? `0 0 25px -5px ${node.color}80, 0 0 50px -10px ${node.color}40`
                      : `0 0 12px -3px ${node.color}30`,
                    color: node.color,
                  }}
                >
                  <span className="text-sm md:text-xl">{node.icon}</span>
                </div>
                <span
                  className="font-mono text-[7px] tracking-[0.02em] md:text-[10px] md:tracking-wider uppercase"
                  style={{ color: activeNode === node.id ? node.color : 'rgba(168, 165, 184, 0.7)' }}
                >
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-bg-surface/40 backdrop-blur-sm border border-border-subtle rounded-3xl p-6 md:p-8 flex flex-col"
          style={{ boxShadow: '0 0 40px -15px rgb(99 102 241 / 0.2)' }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              <FiTerminal className="text-aura-aether-mid" />
              {t('agentDemoTitle')}
            </h3>
            <button
              onClick={runDemo}
              className="inline-flex items-center gap-2 aura-bg-vital text-bg-deep font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_20px_-5px_rgb(232_121_249/0.5)] hover:shadow-[0_0_30px_-5px_rgb(232_121_249/0.8)] transition-shadow"
              style={{ backgroundSize: '200% auto' }}
            >
              {t('agentRun')} <FiArrowRight />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-3 min-h-[280px]">
            {demoMessages.slice(0, demoStep).map((msg, i) => {
              const isUser = msg.role === 'user';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col gap-1 p-3 rounded-2xl border ${
                    isUser
                      ? 'bg-aura-aether-mid/8 border-aura-aether-mid/25'
                      : 'bg-aura-vital-mid/8 border-aura-vital-mid/25'
                  }`}
                >
                  <span className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider ${
                    isUser ? 'text-aura-aether-mid' : 'text-aura-vital-mid'
                  }`}>
                    <span className="text-xs">{msg.icon}</span>
                    {isUser ? 'User' : 'Agent'}
                  </span>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {t(msg.textKey)}
                  </p>
                </motion.div>
              );
            })}

            {demoStep === 0 && (
              <p className="font-mono text-xs text-text-muted italic mt-2">
                {t('agentClickRun')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border-subtle">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-warning opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {t('agentStatus')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

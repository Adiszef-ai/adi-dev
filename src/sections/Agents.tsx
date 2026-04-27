import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCpu, FiArrowRight, FiMessageSquare, FiDatabase, FiGlobe, FiZap } from 'react-icons/fi';
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
  { id: 'user', label: 'User', icon: <FiMessageSquare />, color: '#06b6d4', x: 50, y: 10 },
  { id: 'supervisor', label: 'Supervisor', icon: <FiCpu />, color: '#f59e0b', x: 50, y: 35 },
  { id: 'researcher', label: 'Researcher', icon: <FiGlobe />, color: '#4ade80', x: 15, y: 65 },
  { id: 'analyzer', label: 'Analyzer', icon: <FiDatabase />, color: '#a78bfa', x: 50, y: 65 },
  { id: 'executor', label: 'Executor', icon: <FiZap />, color: '#f43f5e', x: 85, y: 65 },
];

const agentFlows: AgentFlow[] = [
  { from: 'user', to: 'supervisor', label: 'query' },
  { from: 'supervisor', to: 'researcher', label: 'research' },
  { from: 'supervisor', to: 'analyzer', label: 'analyze' },
  { from: 'supervisor', to: 'executor', label: 'execute' },
];

const demoMessages = [
  { role: 'user' as const, textKey: 'agentDemo1' },
  { role: 'agent' as const, textKey: 'agentDemo2' },
  { role: 'agent' as const, textKey: 'agentDemo3' },
  { role: 'agent' as const, textKey: 'agentDemo4' },
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
    <section id="agents" className="agents">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">{t('agentsLabel')}</span>
        <h2 className="section-title">{t('agentsTitle')}</h2>
      </motion.div>

      <div className="agents__layout">
        {/* Agent Flow Diagram */}
        <motion.div
          className="agents__diagram"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="agents__diagram-title">{t('agentArchitecture')}</h3>
          <div className="agents__flow">
            <svg className="agents__flow-svg" viewBox="0 0 100 85">
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
                      stroke="rgba(6, 182, 212, 0.3)"
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 + 2}
                      fill="rgba(6, 182, 212, 0.5)"
                      fontSize="3"
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
                className={`agents__node ${activeNode === node.id ? 'agents__node--active' : ''}`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  '--node-color': node.color,
                } as React.CSSProperties}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.1 }}
              >
                <span className="agents__node-icon">{node.icon}</span>
                <span className="agents__node-label">{node.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent Demo */}
        <motion.div
          className="agents__demo"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="agents__demo-header">
            <h3 className="agents__demo-title">
              <FiCpu /> {t('agentDemoTitle')}
            </h3>
            <button className="btn btn--primary agents__demo-btn" onClick={runDemo}>
              {t('agentRun')} <FiArrowRight />
            </button>
          </div>

          <div className="agents__demo-chat">
            {demoMessages.slice(0, demoStep).map((msg, i) => (
              <motion.div
                key={i}
                className={`agents__demo-msg agents__demo-msg--${msg.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="agents__demo-msg-role">
                  {msg.role === 'user' ? '👤 User' : '🤖 Agent'}
                </span>
                <p className="agents__demo-msg-text">{t(msg.textKey)}</p>
              </motion.div>
            ))}

            {demoStep === 0 && (
              <p className="agents__demo-placeholder">{t('agentClickRun')}</p>
            )}
          </div>

          <div className="agents__demo-status">
            <span className="agents__status-dot" />
            <span className="agents__status-text">{t('agentStatus')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

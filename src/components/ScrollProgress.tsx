import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--color-aura-aether-start), var(--color-aura-aether-mid), var(--color-aura-aether-end))',
        boxShadow: '0 0 12px -2px rgba(99, 102, 241, 0.6)',
        zIndex: 9999,
      }}
    />
  );
}

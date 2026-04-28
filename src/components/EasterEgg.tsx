import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
const RUNES = 'ᚱᚢᚾᛖᚲᚺᛟᛚᛞ⟡ᛚᛁᚷᛏᛒᚱᛁᛗᛁ⟡ᚹᛟ';

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [, setSeq] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          setActive(true);
          setTimeout(() => setActive(false), 4000);
          return [];
        }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="easter-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="easter-egg__text"
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {RUNES}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

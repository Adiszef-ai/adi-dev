import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);

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
          transition={{ duration: 0.5 }}
        >
          <div className="easter-egg__runes">
            {RUNES.split('').map((rune, i) => (
              <motion.span
                key={i}
                className="easter-egg__rune"
                initial={{ opacity: 0, y: 50, rotate: -30 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [50, 0, -20, -60],
                  rotate: [-30, 0, 10, 20],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              >
                {rune}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="easter-egg__text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ᚱᚢᚾᛖ ᚹᛁᛏᚲᚺ
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

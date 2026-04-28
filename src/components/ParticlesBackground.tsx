import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      particles: {
        number: { value: 20, density: { enable: true } },
        color: {
          value: ['#06b6d4', '#f59e0b', '#22d3ee'],
        },
        opacity: {
          value: { min: 0.03, max: 0.15 },
          animation: { enable: true, speed: 0.3, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.25,
          direction: 'none',
        },
        links: {
          enable: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}

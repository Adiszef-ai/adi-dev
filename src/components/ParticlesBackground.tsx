import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
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
            outModes: 'out',
          },
          links: {
            enable: false,
          },
        },
        detectRetina: true,
      }}
    />
  );
}

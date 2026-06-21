import React, {createContext, useContext, useEffect, useState} from 'react';

// Respeta prefers-reduced-motion.
// - En preview (navegador): detecta el ajuste del sistema operativo.
// - En render headless: no existe ese ajuste, por eso se puede forzar con el
//   prop `reducedMotion` de la composición (--props '{"reducedMotion":true}').
const Ctx = createContext<boolean>(false);

export const ReducedMotionProvider: React.FC<{
  force?: boolean;
  children: React.ReactNode;
}> = ({force, children}) => {
  const [os, setOs] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setOs(mq.matches);
    const onChange = () => setOs(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const value = typeof force === 'boolean' ? force : os;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useReducedMotion = (): boolean => useContext(Ctx);

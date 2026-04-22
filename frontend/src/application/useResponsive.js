import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setAncho(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return {
    esMobile:  ancho < 640,
    esTablet:  ancho >= 640 && ancho < 1024,
    esDesktop: ancho >= 1024,
    ancho,
  };
};

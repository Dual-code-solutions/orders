import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * Envuelve el contenido de cada página con una animación de entrada.
 * Usar `key={location.pathname}` aquí causa re-mount en cada cambio de ruta.
 */
export const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
};

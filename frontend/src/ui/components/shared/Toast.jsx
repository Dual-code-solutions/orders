import { useEffect, useState } from 'react';
import './Toast.css';

export const Toast = ({ message, type = 'success', onClose }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Espera 2.7s, luego activa la animación de salida (0.3s), luego llama onClose
    const exitTimer = setTimeout(() => {
      setLeaving(true);
      setTimeout(onClose, 300);
    }, 2700);
    return () => clearTimeout(exitTimer);
  }, [onClose]);

  const colors = {
    success: { bg: '#1D9E75', color: '#fff', icon: '✓' },
    error:   { bg: '#A32D2D', color: '#fff', icon: '✕' },
    info:    { bg: '#7C3A1E', color: '#F5E6C8', icon: 'ℹ' },
  };

  const c = colors[type] ?? colors.info;

  return (
    <div
      className={`toast ${leaving ? 'toast--out' : ''}`}
      style={{ background: c.bg, color: c.color }}
    >
      <span className="toast__icon">{c.icon}</span>
      {message}
    </div>
  );
};

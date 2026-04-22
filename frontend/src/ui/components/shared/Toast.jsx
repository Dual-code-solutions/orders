import { useEffect } from 'react';

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: { bg: '#1D9E75', color: '#fff' },
    error:   { bg: '#A32D2D', color: '#fff' },
    info:    { bg: '#7C3A1E', color: '#F5E6C8' },
  };

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', left: '50%',
      transform: 'translateX(-50%)',
      background: colors[type].bg,
      color: colors[type].color,
      padding: '12px 24px',
      borderRadius: '10px',
      fontSize: '14px',
      fontFamily: "'Playfair Display', serif",
      zIndex: 2000,
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    }}>
      {message}
    </div>
  );
};

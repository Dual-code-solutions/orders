import { useEffect } from 'react';
import { Button } from './Button';

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(30, 15, 5, 0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FDF6EC',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #D4A96A',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E8D5B0',
          background: '#7C3A1E',
        }}>
          <h3 style={{
            margin: 0, fontSize: '17px',
            fontFamily: "'Playfair Display', serif",
            color: '#F5E6C8', fontWeight: 700,
          }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none',
              color: '#F5E6C8', fontSize: '20px',
              cursor: 'pointer', lineHeight: 1, padding: '2px 6px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #E8D5B0',
            display: 'flex', gap: '10px', justifyContent: 'flex-end',
            background: '#FAF0E0',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

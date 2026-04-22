import { useState } from 'react';

export const ProductoCard = ({ producto, onAgregar }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onAgregar(producto)}
      style={{
        background: '#FDF6EC',
        border: '1px solid',
        borderColor: isHovered ? '#D4A96A' : '#E8D5B0',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '12px',
        minHeight: '110px',
        boxShadow: isHovered ? '0 8px 24px rgba(124, 58, 30, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Detalle decorativo sutil */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        right: '-10px',
        fontSize: '70px',
        opacity: 0.03,
        transform: 'rotate(15deg)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        ☕
      </div>

      {/* Nombre */}
      <div style={{ zIndex: 1 }}>
        <p style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          color: '#2C1A0E',
          lineHeight: 1.3,
        }}>
          {producto.nombre}
        </p>
      </div>

      {/* Precio y Botón */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        zIndex: 1,
      }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 700,
          color: '#7C3A1E',
          fontFamily: "'Lato', sans-serif",
          background: '#FAF0E0',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          ${Number(producto.precio_base).toFixed(2)}
        </p>
        
        <button
          style={{
            background: isHovered ? '#7C3A1E' : '#F5E6C8',
            color: isHovered ? '#FDF6EC' : '#7C3A1E',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 400,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isHovered ? '0 4px 12px rgba(124, 58, 30, 0.2)' : 'none',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

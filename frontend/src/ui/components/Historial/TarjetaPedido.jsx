import { useState } from 'react';

export const TarjetaPedido = ({ pedido }) => {
  const [expandido, setExpandido] = useState(false);

  const fecha = new Date(pedido.fecha_hora);
  const horaStr = fecha.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div style={{
      background: '#FDF6EC',
      border: '1px solid #E8D5B0',
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      {/* Cabecera del pedido */}
      <button
        onClick={() => setExpandido(!expandido)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '12px 14px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <p style={{
            margin: 0, fontSize: '15px', fontWeight: 700,
            fontFamily: "'Playfair Display', serif", color: '#2C1A0E',
          }}>
            {pedido.cliente || `Pedido #${pedido.id.slice(-6).toUpperCase()}`}
          </p>
          <p style={{
            margin: '2px 0 0', fontSize: '12px',
            color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
          }}>
            {horaStr} · Folio #{pedido.id.slice(-6).toUpperCase()}
          </p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '16px', fontWeight: 700, color: '#7C3A1E',
          }}>
            ${Number(pedido.total).toFixed(2)}
          </span>
          <span style={{
            color: '#8A6A4A', fontSize: '12px',
            transform: expandido ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            display: 'inline-block',
          }}>
            ▼
          </span>
        </div>
      </button>

      {/* Detalles expandibles */}
      {expandido && pedido.detalles && (
        <div style={{
          borderTop: '1px solid #E8D5B0',
          padding: '12px 14px',
          display: 'flex', flexDirection: 'column', gap: '8px',
        }}>
          {pedido.detalles.map((d, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              fontSize: '13px', fontFamily: "'Lato', sans-serif",
            }}>
              <div style={{ flex: 1 }}>
                <span style={{ color: '#2C1A0E', fontWeight: 700 }}>
                  {d.productos?.nombre || 'Producto'}
                </span>
                {d.comentario && (
                  <p style={{ 
                    margin: '4px 0 0', color: '#8A6A4A', 
                    fontStyle: 'italic', fontSize: '12px',
                    background: '#FFF8EE', padding: '4px 8px',
                    borderRadius: '4px', borderLeft: '2px solid #D4A96A',
                    display: 'inline-block'
                  }}>
                    📝 Nota: {d.comentario}
                  </p>
                )}
              </div>
              <span style={{ color: '#7C3A1E', fontWeight: 700, marginLeft: '12px' }}>
                ${Number(d.precio_unitario).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

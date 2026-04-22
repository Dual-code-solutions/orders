export const Ticket = ({ pedido, detalles, qr }) => {
  const fecha = new Date(pedido.fecha_hora);
  const fechaStr = fecha.toLocaleDateString('es-MX', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
  const horaStr = fecha.toLocaleTimeString('es-MX', {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div style={{
      background: '#FDF6EC',
      border: '1px solid #E8D5B0',
      borderRadius: '16px',
      maxWidth: '360px',
      margin: '0 auto',
      overflow: 'hidden',
      fontFamily: "'Lato', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: '#2C1A0E',
        padding: '1.5rem',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '10px',
      }}>
        <img
          src="/logo.png"
          alt="Como en Casa"
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <p style={{
            margin: 0, color: '#D4A96A',
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px', fontWeight: 700,
          }}>
            Como en Casa
          </p>
          <p style={{ margin: '2px 0 0', color: '#8A6A4A', fontSize: '11px' }}>
            {fechaStr} · {horaStr}
          </p>
        </div>
      </div>

      {/* Cliente y Folio */}
      <div style={{
        background: '#4A2E1A', padding: '8px 1rem',
        textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px'
      }}>
        <p style={{
          margin: 0, color: '#F5E6C8', fontSize: '14px',
          fontFamily: "'Playfair Display', serif", fontWeight: 700
        }}>
          Cliente: {pedido.cliente || 'Sin nombre'}
        </p>
        <p style={{
          margin: 0, color: '#D4A96A', fontSize: '11px',
          fontFamily: 'monospace', letterSpacing: '0.08em',
        }}>
          FOLIO #{pedido.id.slice(-8).toUpperCase()}
        </p>
      </div>

      {/* Línea punteada */}
      <div style={{ borderTop: '2px dashed #E8D5B0', margin: '0 1rem' }} />

      {/* Detalle de productos */}
      <div style={{ padding: '1rem' }}>
        {detalles.map((d, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', padding: '8px 0',
            borderBottom: i < detalles.length - 1 ? '1px solid #F0E0C0' : 'none',
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#2C1A0E', fontWeight: 700 }}>
                {d.productos?.nombre || 'Producto'}
              </p>
              {d.comentario && (
                <p style={{
                  margin: '4px 0 0', fontSize: '12px',
                  color: '#8A6A4A', fontStyle: 'italic',
                }}>
                  📝 Nota: {d.comentario}
                </p>
              )}
            </div>
            <span style={{
              fontSize: '14px', fontWeight: 700, color: '#7C3A1E',
              marginLeft: '12px', whiteSpace: 'nowrap',
            }}>
              ${Number(d.precio_unitario).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Línea punteada */}
      <div style={{ borderTop: '2px dashed #E8D5B0', margin: '0 1rem' }} />

      {/* Total */}
      <div style={{
        padding: '1rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '16px', fontWeight: 700, color: '#2C1A0E',
        }}>
          TOTAL
        </span>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '24px', fontWeight: 700, color: '#7C3A1E',
        }}>
          ${Number(pedido.total).toFixed(2)}
        </span>
      </div>

      {/* QR */}
      {qr && (
        <>
          <div style={{ borderTop: '2px dashed #E8D5B0', margin: '0 1rem' }} />
          <div style={{
            padding: '1.25rem', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          }}>
            <p style={{ margin: 0, fontSize: '11px', color: '#8A6A4A' }}>
              Escanea para ver tu ticket
            </p>
            <img
              src={qr}
              alt="QR del ticket"
              style={{ width: '120px', height: '120px' }}
            />
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ background: '#2C1A0E', padding: '10px', textAlign: 'center' }}>
        <p style={{ margin: 0, color: '#5A3E28', fontSize: '10px', fontFamily: 'monospace' }}>
          ¡Gracias por su preferencia!
        </p>
      </div>
    </div>
  );
};

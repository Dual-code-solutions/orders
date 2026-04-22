import { TarjetaPedido } from './TarjetaPedido';

export const ListaPedidos = ({ corte, pedidos, onEliminarCorte, loading }) => {
  const fecha = new Date(corte.fecha).toLocaleDateString('es-MX', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

  const totalDia = pedidos.reduce((acc, p) => acc + Number(p.total), 0);

  return (
    <div style={{
      background: '#FAF0E0',
      border: '1px solid #D4A96A',
      borderRadius: '14px',
      overflow: 'hidden',
    }}>
      {/* Header del corte */}
      <div style={{
        background: '#2C1A0E', padding: '1rem 1.25rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <p style={{
            margin: 0, color: '#D4A96A',
            fontFamily: "'Playfair Display', serif",
            fontSize: '15px', fontWeight: 700,
            textTransform: 'capitalize',
          }}>
            {fecha}
          </p>
          <p style={{
            margin: '2px 0 0', color: '#8A6A4A', fontSize: '11px',
            fontFamily: "'Lato', sans-serif",
          }}>
            {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} ·{' '}
            {corte.cerrado ? '✓ Cerrado' : '🟢 Activo'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{
            margin: 0, color: '#F5E6C8',
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px', fontWeight: 700,
          }}>
            ${totalDia.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Lista de pedidos */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {loading ? (
          <p style={{
            textAlign: 'center', color: '#8A6A4A',
            fontFamily: "'Lato', sans-serif", fontSize: '13px', padding: '1rem',
          }}>
            Cargando pedidos...
          </p>
        ) : pedidos.length === 0 ? (
          <p style={{
            textAlign: 'center', color: '#8A6A4A',
            fontFamily: "'Lato', sans-serif", fontSize: '13px', padding: '1rem',
          }}>
            Sin pedidos registrados.
          </p>
        ) : (
          pedidos.map((p) => <TarjetaPedido key={p.id} pedido={p} />)
        )}
      </div>

      {/* Botón eliminar solo si está cerrado */}
      {corte.cerrado && (
        <div style={{
          padding: '10px 12px',
          borderTop: '1px solid #E8D5B0',
          textAlign: 'right',
        }}>
          <button
            onClick={() => onEliminarCorte(corte.id)}
            style={{
              background: 'transparent', border: '1px solid #E0A0A0',
              borderRadius: '6px', padding: '6px 14px',
              fontSize: '12px', color: '#A32D2D',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
            }}
          >
            🗑 Eliminar historial
          </button>
        </div>
      )}
    </div>
  );
};

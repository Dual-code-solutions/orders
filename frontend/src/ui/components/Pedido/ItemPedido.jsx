import { useState } from 'react';

export const ItemPedido = ({ item, onEliminar, onActualizarComentario }) => {
  const [editando, setEditando] = useState(false);
  const [comentario, setComentario] = useState(item.comentario || '');

  const guardarComentario = () => {
    onActualizarComentario(item.producto_id, item.comentario, comentario);
    setEditando(false);
  };

  return (
    <div style={{
      background: '#FFF',
      border: '1px solid #E8D5B0',
      borderRadius: '12px',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 2px 8px rgba(44, 26, 14, 0.03)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <p style={{
            margin: 0, fontSize: '14px', fontWeight: 700,
            fontFamily: "'Playfair Display', serif", color: '#2C1A0E',
          }}>
            {item.nombre}
            <span style={{
              marginLeft: '10px', fontSize: '13px',
              color: '#F5E6C8', background: '#7C3A1E',
              fontWeight: 700, padding: '2px 8px',
              borderRadius: '12px', display: 'inline-block',
              fontFamily: "'Lato', sans-serif",
              verticalAlign: 'middle',
              transform: 'translateY(-1px)'
            }}>
              x{item.cantidad}
            </span>
          </p>
          <p style={{
            margin: 0, fontSize: '13px', color: '#7C3A1E',
            fontFamily: "'Lato', sans-serif", fontWeight: 700,
          }}>
            ${(item.precio_unitario * item.cantidad).toFixed(2)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setEditando(!editando)}
            style={{
              background: 'transparent', border: '1px solid #D4A96A',
              borderRadius: '6px', padding: '4px 8px',
              fontSize: '11px', color: '#8A6A4A',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
            }}
          >
            {editando ? 'Cancelar' : '✏️ Nota'}
          </button>
          <button
            onClick={() => onEliminar(item.producto_id, item.comentario)}
            style={{
              background: 'transparent', border: '1px solid #E0A0A0',
              borderRadius: '6px', padding: '4px 8px',
              fontSize: '11px', color: '#A32D2D',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Editor de comentario */}
      {editando && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="ej. sin cebolla, +queso..."
            style={{
              flex: 1, padding: '6px 10px',
              border: '1px solid #D4A96A', borderRadius: '6px',
              fontSize: '13px', fontFamily: "'Lato', sans-serif",
              background: '#FFF8EE', color: '#2C1A0E', outline: 'none',
            }}
          />
          <button
            onClick={guardarComentario}
            style={{
              background: '#7C3A1E', color: '#F5E6C8',
              border: 'none', borderRadius: '6px',
              padding: '6px 12px', fontSize: '12px',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* Mostrar comentario guardado */}
      {!editando && item.comentario && (
        <p style={{
          margin: 0, fontSize: '12px', color: '#8A6A4A',
          fontFamily: "'Lato', sans-serif",
          fontStyle: 'italic',
        }}>
          📝 {item.comentario}
        </p>
      )}
    </div>
  );
};

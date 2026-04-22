import { useState } from 'react';

export const ItemPedido = ({ item, onEliminar, onCambiarCantidad, onActualizarComentario }) => {
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
      {/* Fila superior: Título y Precio */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{
          margin: 0, fontSize: '15px', fontWeight: 700,
          fontFamily: "'Playfair Display', serif", color: '#2C1A0E', flex: 1, paddingRight: '10px'
        }}>
          {item.nombre}
        </p>
        <p style={{
          margin: 0, fontSize: '16px', color: '#7C3A1E',
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
        }}>
          ${(item.precio_unitario * item.cantidad).toFixed(2)}
        </p>
      </div>

      {/* Fila inferior: Controles de cantidad y Acciones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
        {/* Control de cantidad */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: '#FFF', borderRadius: '20px',
          border: '1px solid #E8D5B0', overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(44,26,14,0.02)'
        }}>
          <button
            onClick={() => onCambiarCantidad(item.producto_id, item.comentario, -1)}
            style={{
              background: '#FFF8EE', border: 'none', padding: '4px 12px',
              color: '#7C3A1E', fontSize: '14px', cursor: 'pointer', fontWeight: 700,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#F5E6C8'}
            onMouseLeave={(e) => e.target.style.background = '#FFF8EE'}
          >
            -
          </button>
          <span style={{
            fontSize: '13px', color: '#2C1A0E',
            fontWeight: 700, fontFamily: "'Lato', sans-serif",
            width: '24px', textAlign: 'center'
          }}>
            {item.cantidad}
          </span>
          <button
            onClick={() => onCambiarCantidad(item.producto_id, item.comentario, 1)}
            style={{
              background: '#FFF8EE', border: 'none', padding: '4px 12px',
              color: '#7C3A1E', fontSize: '14px', cursor: 'pointer', fontWeight: 700,
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#F5E6C8'}
            onMouseLeave={(e) => e.target.style.background = '#FFF8EE'}
          >
            +
          </button>
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setEditando(!editando)}
            style={{
              background: '#FFF', border: '1px solid #D4A96A',
              borderRadius: '8px', padding: '6px 10px',
              fontSize: '12px', color: '#7C3A1E', fontWeight: 700,
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#FFF8EE'}
            onMouseLeave={(e) => e.target.style.background = '#FFF'}
          >
            {editando ? 'Cancelar' : '✏️ Nota'}
          </button>
          <button
            onClick={() => onEliminar(item.producto_id, item.comentario)}
            style={{
              background: '#FFF0F0', border: '1px solid #E0A0A0',
              borderRadius: '8px', padding: '6px 10px',
              fontSize: '12px', color: '#A32D2D',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#FAD4D4'}
            onMouseLeave={(e) => e.target.style.background = '#FFF0F0'}
          >
            🗑
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

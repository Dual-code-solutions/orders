import { useState } from 'react';
import './ItemPedido.css';

export const ItemPedido = ({ item, onEliminar, onCambiarCantidad, onActualizarComentario }) => {
  const [editando, setEditando] = useState(false);
  const [comentario, setComentario] = useState(item.comentario || '');

  const guardarComentario = () => {
    onActualizarComentario(item.producto_id, item.comentario, comentario);
    setEditando(false);
  };

  return (
    <div className="item-pedido">

      {/* Fila superior: Nombre y Precio */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{
          margin: 0, fontSize: '15px', fontWeight: 700,
          fontFamily: "'Playfair Display', serif", color: '#2C1A0E',
          flex: 1, paddingRight: '10px', lineHeight: 1.3,
        }}>
          {item.nombre}
        </p>
        <p style={{
          margin: 0, fontSize: '16px', color: '#7C3A1E',
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          ${(item.precio_unitario * item.cantidad).toFixed(2)}
        </p>
      </div>

      {/* Fila inferior: Cantidad + Acciones */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Control de cantidad */}
        <div className="item-pedido__qty-ctrl">
          <button
            className="item-pedido__qty-btn"
            onClick={() => onCambiarCantidad(item.producto_id, item.comentario, -1)}
          >
            −
          </button>
          <span className="item-pedido__qty-value">{item.cantidad}</span>
          <button
            className="item-pedido__qty-btn"
            onClick={() => onCambiarCantidad(item.producto_id, item.comentario, 1)}
          >
            +
          </button>
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

          {/* Botón nota */}
          <button
            onClick={() => setEditando(!editando)}
            title={editando ? 'Cancelar nota' : 'Agregar nota'}
            style={{
              background: editando ? '#FFF3E0' : '#FFF',
              border: `1.5px solid ${editando ? '#C9A84C' : '#E2C88A'}`,
              borderRadius: '8px',
              padding: '5px 11px',
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '12px', color: '#7C3A1E', fontWeight: 700,
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {editando ? (
              /* X para cancelar */
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="11" y2="11" />
                <line x1="11" y1="1" x2="1" y2="11" />
              </svg>
            ) : (
              /* Lápiz SVG */
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            )}
            {editando ? 'Cancelar' : 'Nota'}
          </button>

          {/* Botón eliminar */}
          <button
            onClick={() => onEliminar(item.producto_id, item.comentario)}
            title="Eliminar ítem"
            style={{
              background: 'transparent',
              border: '1.5px solid #E8C4C4',
              borderRadius: '8px',
              width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: '#C0392B',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FDE8E8';
              e.currentTarget.style.borderColor = '#C0392B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#E8C4C4';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>

        </div>
      </div>

      {/* Editor de comentario */}
      {editando && (
        <div style={{ display: 'flex', gap: '8px', animation: 'slideInRight 0.25s ease' }}>
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && guardarComentario()}
            placeholder="ej. sin cebolla, +queso..."
            style={{
              flex: 1, padding: '7px 10px',
              border: '1px solid #D4A96A', borderRadius: '8px',
              fontSize: '13px', fontFamily: "'Lato', sans-serif",
              background: '#FFFAF3', color: '#2C1A0E', outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#7C3A1E'}
            onBlur={(e) => e.target.style.borderColor = '#D4A96A'}
            autoFocus
          />
          <button
            onClick={guardarComentario}
            style={{
              background: '#7C3A1E', color: '#F5E6C8',
              border: 'none', borderRadius: '8px',
              padding: '6px 14px', fontSize: '12px',
              fontFamily: "'Lato', sans-serif", cursor: 'pointer',
              fontWeight: 700, transition: 'opacity 0.2s',
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* Nota guardada — chip limpio */}
      {!editando && item.comentario && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(135deg, #FFF8EE, #FFF3E0)',
          border: '1px solid rgba(201,168,76,0.35)',
          borderRadius: '6px',
          padding: '4px 9px',
          alignSelf: 'flex-start',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span style={{
            fontSize: '11.5px', color: '#7C3A1E',
            fontFamily: "'Lato', sans-serif",
            fontWeight: 500, lineHeight: 1.3,
          }}>
            {item.comentario}
          </span>
        </div>
      )}
    </div>
  );
};

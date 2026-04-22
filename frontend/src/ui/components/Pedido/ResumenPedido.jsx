import { useState } from 'react';
import { ItemPedido } from './ItemPedido';
import { Button } from '../shared/Button';

export const ResumenPedido = ({
  carrito,
  total,
  onEliminar,
  onCambiarCantidad,
  onActualizarComentario,
  onConfirmar,
  onLimpiar,
  loading,
}) => {
  const [cliente, setCliente] = useState('');

  if (!carrito.length) return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      height: '100%', padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(to bottom, #FDF6EC, #FAF0E0)',
    }}>
      <div style={{
        width: '80px', height: '80px',
        background: '#F5ECD7', borderRadius: '50%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        marginBottom: '1rem',
        boxShadow: 'inset 0 2px 4px rgba(44, 26, 14, 0.05), 0 8px 16px rgba(44, 26, 14, 0.05)',
      }}>
        <span style={{ fontSize: '2.5rem' }}>🍽️</span>
      </div>
      <p style={{
        margin: '0 0 8px', fontSize: '18px', fontWeight: 700,
        fontFamily: "'Playfair Display', serif", color: '#2C1A0E',
      }}>
        Tu pedido está vacío
      </p>
      <p style={{
        margin: 0, fontSize: '14px', color: '#8A6A4A',
        fontFamily: "'Lato', sans-serif", lineHeight: 1.5,
        maxWidth: '220px',
      }}>
        Agrega platillos desde el menú a la izquierda para comenzar a tomar la orden.
      </p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Lista de items */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}>
        {carrito.map((item) => (
          <ItemPedido
            key={`${item.producto_id}-${item.comentario}`}
            item={item}
            onEliminar={onEliminar}
            onCambiarCantidad={onCambiarCantidad}
            onActualizarComentario={onActualizarComentario}
          />
        ))}
      </div>

      {/* Input de cliente, Total y acciones */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid #E8D5B0',
        background: '#FAF0E0',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.03)',
      }}>
        {/* Input Cliente */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block', fontSize: '13px', color: '#8A6A4A',
            fontFamily: "'Lato', sans-serif", marginBottom: '6px',
            fontWeight: 700
          }}>
            Nombre del cliente *
          </label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Ej. Juan Pérez"
            style={{
              width: '100%', padding: '12px 14px',
              border: '1px solid #D4A96A', borderRadius: '10px',
              fontSize: '15px', fontFamily: "'Lato', sans-serif",
              background: '#FFF', color: '#2C1A0E', outline: 'none',
              boxSizing: 'border-box',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#7C3A1E'}
            onBlur={(e) => e.target.style.borderColor = '#D4A96A'}
          />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '1rem',
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '16px', fontWeight: 700, color: '#2C1A0E',
          }}>
            Total
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '24px', fontWeight: 700, color: '#7C3A1E',
          }}>
            ${total.toFixed(2)}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="ghost" onClick={onLimpiar} size="sm">
            Limpiar
          </Button>
          <Button
            variant="primary"
            onClick={() => onConfirmar(cliente)}
            disabled={loading || !cliente.trim()}
            fullWidth
            size="lg"
          >
            {loading ? 'Registrando...' : 'Confirmar Pedido'}
          </Button>
        </div>
      </div>
    </div>
  );
};

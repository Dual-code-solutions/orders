import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../application/useMenu';
import { usePedido } from '../../application/usePedido';
import { useResponsive } from '../../application/useResponsive';
import { MenuGrid } from '../components/Menu/MenuGrid';
import { ResumenPedido } from '../components/Pedido/ResumenPedido';
import { Toast } from '../components/shared/Toast';

export const NuevoPedido = () => {
  const navigate = useNavigate();
  const { esMobile } = useResponsive();
  const { productos, categorias, loading: loadingMenu } = useMenu();
  const {
    carrito, calcularTotal, agregarAlCarrito,
    quitarDelCarrito, cambiarCantidad, actualizarComentario,
    limpiarCarrito, confirmarPedido, loading,
  } = usePedido();

  const [vista, setVista] = useState('menu');
  const [toast, setToast] = useState(null);

  const mostrarToast = (message, type = 'success') => setToast({ message, type });

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    mostrarToast(`${producto.nombre} agregado`, 'info');
  };

  const handleConfirmar = async (cliente) => {
    try {
      const resultado = await confirmarPedido(cliente);
      navigate(`/ticket/${resultado.pedido.id}`);
    } catch (e) {
      mostrarToast(e.message, 'error');
    }
  };

  // ── Tablet y desktop: layout en dos columnas ──
  if (!esMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F5ECD7',
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: 0,
      }}>
        {/* Columna izquierda — Menú */}
        <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <div style={{
            padding: '1rem 1.25rem 0.5rem',
            borderBottom: '1px solid #E8D5B0',
            background: '#FDF6EC',
            position: 'sticky', top: 0, zIndex: 10,
          }}>
            <p style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: 700, color: '#2C1A0E',
            }}>
              Menú
            </p>
          </div>
          <MenuGrid
            productos={productos}
            onAgregar={handleAgregar}
            loading={loadingMenu}
          />
        </div>

        {/* Columna derecha — Resumen */}
        <div style={{
          background: '#FDF6EC',
          borderLeft: '1px solid #E8D5B0',
          display: 'flex', flexDirection: 'column',
          maxHeight: '100vh', overflow: 'hidden',
        }}>
          <div style={{
            padding: '1rem 1.25rem 0.5rem',
            borderBottom: '1px solid #E8D5B0',
          }}>
            <p style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: 700, color: '#2C1A0E',
            }}>
              Pedido actual
            </p>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <ResumenPedido
              carrito={carrito}
              total={calcularTotal()}
              onEliminar={quitarDelCarrito}
              onCambiarCantidad={cambiarCantidad}
              onActualizarComentario={actualizarComentario}
              onConfirmar={handleConfirmar}
              onLimpiar={limpiarCarrito}
              loading={loading}
            />
          </div>
        </div>

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    );
  }

  // ── Mobile: layout con tabs ──
  return (
    <div style={{ minHeight: '100vh', background: '#F5ECD7' }}>
      {/* Tab bar con indicador deslizante */}
      <div style={{
        position: 'sticky', top: '60px', zIndex: 10,
        background: '#FDF6EC',
        borderBottom: '1px solid #E8D5B0',
      }}>
        <div style={{ display: 'flex', position: 'relative' }}>
          {['menu', 'resumen'].map((tab) => (
            <button
              key={tab}
              onClick={() => setVista(tab)}
              style={{
                flex: 1, padding: '14px',
                background: 'none', border: 'none',
                color: vista === tab ? '#7C3A1E' : '#8A6A4A',
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px', fontWeight: 700,
                cursor: 'pointer',
                transition: 'color 0.25s ease',
              }}
            >
              {tab === 'menu' ? '🍽️ Menú' : `🛒 Pedido (${carrito.length})`}
            </button>
          ))}
          {/* Indicador deslizante */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: vista === 'menu' ? '0%' : '50%',
            width: '50%',
            height: '3px',
            background: 'linear-gradient(90deg, #7C3A1E, #C9A84C)',
            borderRadius: '3px 3px 0 0',
            transition: 'left 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>
      </div>

      {vista === 'menu' ? (
        <MenuGrid productos={productos} onAgregar={handleAgregar} loading={loadingMenu} />
      ) : (
        <div style={{ height: 'calc(100vh - 120px)' }}>
          <ResumenPedido
            carrito={carrito}
            total={calcularTotal()}
            onEliminar={quitarDelCarrito}
            onCambiarCantidad={cambiarCantidad}
            onActualizarComentario={actualizarComentario}
            onConfirmar={handleConfirmar}
            onLimpiar={limpiarCarrito}
            loading={loading}
          />
        </div>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
};

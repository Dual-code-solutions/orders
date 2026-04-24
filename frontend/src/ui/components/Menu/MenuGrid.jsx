import { useState, useMemo } from 'react';
import { useResponsive } from '../../../application/useResponsive';
import { ProductoCard } from './ProductoCard';

export const MenuGrid = ({ productos, onAgregar, loading }) => {
  const { esMobile, esTablet } = useResponsive();
  const [busqueda, setBusqueda] = useState('');

  const columnas = esMobile ? '1fr' : esTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(3, 1fr)';

  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos;
    const q = busqueda.toLowerCase();
    return productos.filter(p => p.nombre.toLowerCase().includes(q));
  }, [productos, busqueda]);

  if (loading) return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '4rem', color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
    }}>
      <div style={{
        width: '24px', height: '24px', border: '3px solid #E8D5B0',
        borderTopColor: '#7C3A1E', borderRadius: '50%', animation: 'spin 1s linear infinite'
      }} />
      <span style={{ marginLeft: '12px' }}>Cargando menú...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ padding: esMobile ? '16px' : '1.5rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Buscador */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#FFF', borderRadius: '12px',
        border: '1px solid #D4A96A', padding: '10px 14px',
        boxShadow: 'inset 0 2px 4px rgba(44,26,14,0.02)',
      }}>
        <span style={{ fontSize: '16px', marginRight: '10px', opacity: 0.6 }}></span>
        <input
          type="text"
          placeholder="Buscar platillo por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            border: 'none', background: 'transparent', outline: 'none',
            flex: 1, fontSize: '15px', fontFamily: "'Lato', sans-serif",
            color: '#2C1A0E',
          }}
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda('')}
            style={{
              background: '#FFF0F0', border: '1px solid #E0A0A0', cursor: 'pointer',
              color: '#A32D2D', fontSize: '11px', padding: '4px 8px', borderRadius: '6px',
              fontFamily: "'Lato', sans-serif", fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Grid o Estado vacío */}
      {!productos.length ? (
        <div style={{
          textAlign: 'center', padding: '4rem',
          color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.5 }}>🍽️</div>
          <p style={{ margin: 0, fontSize: '16px' }}>El menú está vacío por ahora.</p>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '3rem',
          color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
          background: '#FDF6EC', border: '1px dashed #D4A96A', borderRadius: '12px'
        }}>
          <p style={{ margin: 0, fontSize: '15px' }}>No se encontraron platillos con "{busqueda}".</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: columnas,
          gap: esMobile ? '12px' : '16px',
        }}>
          {productosFiltrados.map((p, i) => (
            <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

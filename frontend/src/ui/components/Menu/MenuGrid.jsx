import { useResponsive } from '../../../application/useResponsive';
import { ProductoCard } from './ProductoCard';

export const MenuGrid = ({ productos, onAgregar, loading }) => {
  const { esMobile, esTablet } = useResponsive();

  const columnas = esMobile ? '1fr' : esTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(3, 1fr)';

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

  if (!productos.length) return (
    <div style={{
      textAlign: 'center', padding: '4rem',
      color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
    }}>
      <div style={{ fontSize: '40px', marginBottom: '16px', opacity: 0.5 }}>🍽️</div>
      <p style={{ margin: 0, fontSize: '16px' }}>El menú está vacío por ahora.</p>
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: columnas,
      gap: esMobile ? '12px' : '16px',
      padding: esMobile ? '16px' : '1.5rem',
    }}>
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} />
      ))}
    </div>
  );
};

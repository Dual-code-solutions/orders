import { useResponsive } from '../../../application/useResponsive';
import { ProductoCard } from './ProductoCard';

export const MenuGrid = ({ productos, onAgregar, loading }) => {
  const { esMobile, esTablet } = useResponsive();

  const columnas = esMobile ? '1fr' : esTablet
    ? 'repeat(2, 1fr)'
    : 'repeat(3, 1fr)';

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#8A6A4A', fontFamily: "'Lato', sans-serif" }}>
      Cargando menú...
    </div>
  );

  if (!productos.length) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: '#8A6A4A', fontFamily: "'Lato', sans-serif" }}>
      No hay productos en el menú.
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: columnas,
      gap: esMobile ? '10px' : '16px',
      padding: esMobile ? '12px' : '1.5rem',
    }}>
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} />
      ))}
    </div>
  );
};

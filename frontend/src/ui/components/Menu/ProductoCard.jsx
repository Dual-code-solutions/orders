export const ProductoCard = ({ producto, onAgregar }) => {
  return (
    <div style={{
      background: '#FFF8EE',
      border: '1px solid #E8D5B0',
      borderRadius: '16px',
      padding: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: '0 4px 12px rgba(44, 26, 14, 0.04)',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(44, 26, 14, 0.08)';
        e.currentTarget.style.borderColor = '#D4A96A';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 26, 14, 0.04)';
        e.currentTarget.style.borderColor = '#E8D5B0';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{
          margin: 0, fontSize: '16px', fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          color: '#2C1A0E', flex: 1, lineHeight: 1.2
        }}>
          {producto.nombre}
        </p>
      </div>

      {producto.descripcion && (
        <p style={{
          margin: 0, fontSize: '13px',
          color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
          lineHeight: 1.5, flex: 1
        }}>
          {producto.descripcion}
        </p>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingTop: '8px'
      }}>
        <span style={{
          color: '#7C3A1E',
          fontSize: '18px', fontWeight: 700,
          fontFamily: "'Lato', sans-serif",
        }}>
          ${Number(producto.precio_base).toFixed(2)}
        </span>

        <button
          onClick={() => onAgregar(producto)}
          style={{
            background: '#FDF6EC', color: '#7C3A1E',
            border: '1px solid #D4A96A', borderRadius: '50px',
            padding: '8px 16px', fontSize: '13px',
            fontFamily: "'Lato', sans-serif",
            fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#7C3A1E';
            e.currentTarget.style.color = '#F5E6C8';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#FDF6EC';
            e.currentTarget.style.color = '#7C3A1E';
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

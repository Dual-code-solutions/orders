export const QRCode = ({ src }) => {
  if (!src) return null;
  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <img
        src={src}
        alt="Código QR"
        style={{ width: '140px', height: '140px' }}
      />
      <p style={{
        margin: '8px 0 0', fontSize: '11px',
        color: '#8A6A4A', fontFamily: "'Lato', sans-serif",
      }}>
        Muéstrale este QR al cliente
      </p>
    </div>
  );
};

const variants = {
  primary: {
    background: '#7C3A1E',
    color: '#F5E6C8',
    border: '1px solid #7C3A1E',
  },
  secondary: {
    background: 'transparent',
    color: '#7C3A1E',
    border: '1px solid #7C3A1E',
  },
  danger: {
    background: 'transparent',
    color: '#A32D2D',
    border: '1px solid #A32D2D',
  },
  ghost: {
    background: 'transparent',
    color: '#5F5E5A',
    border: '1px solid transparent',
  },
};

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  size = 'md',
}) => {
  const padding = size === 'sm' ? '8px 14px' : size === 'lg' ? '14px 24px' : '10px 20px';
  const fontSize = size === 'sm' ? '13px' : size === 'lg' ? '16px' : '14px';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        padding,
        fontSize,
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </button>
  );
};

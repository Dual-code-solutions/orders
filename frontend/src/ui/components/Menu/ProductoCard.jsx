import { useState } from 'react';
import './ProductoCard.css';

export const ProductoCard = ({ producto, onAgregar, index = 0 }) => {
  const [ripple, setRipple] = useState(null);

  const handleBtnClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    onAgregar(producto);
  };

  return (
    <div
      className="producto-card"
      style={{ animationDelay: `${index * 0.055}s` }}
      onClick={() => onAgregar(producto)}
    >
      {/* Nombre */}
      <p className="producto-card__nombre">{producto.nombre}</p>

      {/* Footer: precio + botón */}
      <div className="producto-card__footer">
        <span className="producto-card__precio">
          ${Number(producto.precio_base).toFixed(2)}
        </span>

        <button className="producto-card__btn" onClick={handleBtnClick}>
          +
          {ripple && (
            <span
              className="producto-card__ripple"
              style={{ left: ripple.x, top: ripple.y }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

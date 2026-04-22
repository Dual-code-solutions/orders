// Regla de dominio del lado cliente
// Recibe array de items del carrito { precio_unitario, cantidad }
export const calcularTotal = (items) => {
  return items.reduce((acc, item) => acc + Number(item.precio_unitario) * item.cantidad, 0);
};

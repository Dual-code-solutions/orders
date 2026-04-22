// Recibe array de { precio_unitario }
export const calcularTotal = (detalles) => {
  return detalles.reduce((acc, item) => acc + Number(item.precio_unitario), 0);
};

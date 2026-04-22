export const validarPedido = (detalles) => {
  if (!detalles || detalles.length === 0) {
    throw new Error('El pedido debe tener al menos un producto.');
  }
  for (const item of detalles) {
    if (!item.producto_id) throw new Error('Cada detalle debe tener un producto_id.');
    if (item.precio_unitario === undefined || item.precio_unitario < 0) {
      throw new Error('precio_unitario inválido en uno de los detalles.');
    }
  }
};

export class DetallePedido {
  constructor({ id, pedido_id, producto_id, comentario = null, precio_unitario }) {
    if (precio_unitario < 0) throw new Error('El precio no puede ser negativo.');
    this.id = id;
    this.pedido_id = pedido_id;
    this.producto_id = producto_id;
    this.comentario = comentario || null;
    this.precio_unitario = precio_unitario;
  }
}

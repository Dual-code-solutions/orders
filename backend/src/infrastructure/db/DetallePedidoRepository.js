import { supabase } from './supabaseClient.js';

export class DetallePedidoRepository {
  async crearDetalles(detalles) {
    const rows = detalles.map((d) => ({
      pedido_id: d.pedido_id,
      producto_id: d.producto_id,
      comentario: d.comentario || null,
      precio_unitario: d.precio_unitario,
    }));

    const { data, error } = await supabase
      .from('detalle_pedido_adm')
      .insert(rows)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async obtenerPorPedido(pedido_id) {
    const { data, error } = await supabase
      .from('detalle_pedido_adm')
      .select(`
        *,
        productos (nombre, precio_base)
      `)
      .eq('pedido_id', pedido_id);

    if (error) throw new Error(error.message);
    return data;
  }
}

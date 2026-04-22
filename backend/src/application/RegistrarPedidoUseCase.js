import { PedidoAdm } from '../domain/entities/PedidoAdm.js';
import { DetallePedido } from '../domain/entities/DetallePedido.js';
import { calcularTotal } from '../domain/rules/calcularTotal.js';
import { validarPedido } from '../domain/rules/validarPedido.js';

export class RegistrarPedidoUseCase {
  constructor({ corteRepository, pedidoRepository, detalleRepository }) {
    this.corteRepository = corteRepository;
    this.pedidoRepository = pedidoRepository;
    this.detalleRepository = detalleRepository;
  }

  async ejecutar({ id_local, cliente = 'Cliente', detalles }) {
    // 1. Validar detalles
    validarPedido(detalles);

    // 2. Buscar corte activo o crear uno nuevo
    let corte = await this.corteRepository.obtenerActivo(id_local);
    if (!corte) {
      corte = await this.corteRepository.crear({
        id_local,
        fecha: new Date(),
        cerrado: false,
      });
    }

    // 3. Calcular total
    const total = calcularTotal(detalles);

    // 4. Crear pedido
    const pedido = await this.pedidoRepository.crear({
      corte_id: corte.id,
      cliente,
      fecha_hora: new Date(),
      total,
    });

    // 5. Crear detalles
    const detallesConPedidoId = detalles.map(
      (d) =>
        new DetallePedido({
          pedido_id: pedido.id,
          producto_id: d.producto_id,
          comentario: d.comentario || null,
          precio_unitario: d.precio_unitario,
        })
    );

    await this.detalleRepository.crearDetalles(detallesConPedidoId);

    return { pedido, detalles: detallesConPedidoId };
  }
}

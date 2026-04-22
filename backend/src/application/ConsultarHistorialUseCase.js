export class ConsultarHistorialUseCase {
  constructor({ corteRepository, pedidoRepository, detalleRepository }) {
    this.corteRepository = corteRepository;
    this.pedidoRepository = pedidoRepository;
    this.detalleRepository = detalleRepository;
  }

  async listarCortes(id_local) {
    return await this.corteRepository.listar(id_local);
  }

  async obtenerPedidosDeCorte(corte_id) {
    const pedidos = await this.pedidoRepository.listarPorCorte(corte_id);

    // Enriquecer cada pedido con sus detalles
    const pedidosConDetalles = await Promise.all(
      pedidos.map(async (pedido) => {
        const detalles = await this.detalleRepository.obtenerPorPedido(pedido.id);
        return { ...pedido, detalles };
      })
    );

    return pedidosConDetalles;
  }
}

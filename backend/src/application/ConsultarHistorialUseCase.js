export class ConsultarHistorialUseCase {
  constructor({ corteRepository, pedidoRepository, detalleRepository }) {
    this.corteRepository = corteRepository;
    this.pedidoRepository = pedidoRepository;
    this.detalleRepository = detalleRepository;
  }

  async listarCortes(id_local) {
    const cortes = await this.corteRepository.listar(id_local);
    
    // Calcular el total para cortes cerrados (para que se muestre en el acordeón sin expandir)
    const cortesConTotales = await Promise.all(
      cortes.map(async (corte) => {
        if (corte.cerrado) {
          const pedidos = await this.pedidoRepository.listarPorCorte(corte.id);
          const total = pedidos.reduce((acc, p) => acc + Number(p.total), 0);
          return { ...corte, total_ventas: total };
        }
        return corte;
      })
    );
    
    return cortesConTotales;
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

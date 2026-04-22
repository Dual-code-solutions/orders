export class PedidoController {
  constructor({ registrarPedidoUseCase, pedidoRepository, detalleRepository, qrGenerator }) {
    this.registrarPedidoUseCase = registrarPedidoUseCase;
    this.pedidoRepository = pedidoRepository;
    this.detalleRepository = detalleRepository;
    this.qrGenerator = qrGenerator;
  }

  registrar = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const resultado = await this.registrarPedidoUseCase.ejecutar({
        id_local,
        cliente: req.body.cliente || 'Cliente',
        detalles: req.body.detalles,
      });
      res.status(201).json({ ok: true, data: resultado });
    } catch (e) { next(e); }
  };

  obtenerConQR = async (req, res, next) => {
    try {
      const pedido = await this.pedidoRepository.obtenerPorId(req.params.id);
      if (!pedido) return res.status(404).json({ ok: false, message: 'Pedido no encontrado.' });

      const detalles = await this.detalleRepository.obtenerPorPedido(pedido.id);
      const url = `${process.env.BASE_URL}/ticket/${pedido.id}?cliente=true`;
      const qr = await this.qrGenerator.generar(url);

      res.json({ ok: true, data: { pedido, detalles, qr } });
    } catch (e) { next(e); }
  };
}

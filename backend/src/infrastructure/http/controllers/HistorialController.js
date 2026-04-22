export class HistorialController {
  constructor({ consultarHistorialUseCase, eliminarHistorialUseCase }) {
    this.consultarHistorialUseCase = consultarHistorialUseCase;
    this.eliminarHistorialUseCase = eliminarHistorialUseCase;
  }

  listar = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const cortes = await this.consultarHistorialUseCase.listarCortes(id_local);
      res.json({ ok: true, data: cortes });
    } catch (e) { next(e); }
  };

  obtenerPedidos = async (req, res, next) => {
    try {
      const pedidos = await this.consultarHistorialUseCase.obtenerPedidosDeCorte(req.params.corteId);
      res.json({ ok: true, data: pedidos });
    } catch (e) { next(e); }
  };

  eliminar = async (req, res, next) => {
    try {
      await this.eliminarHistorialUseCase.ejecutar(req.params.corteId);
      res.json({ ok: true, message: 'Historial eliminado.' });
    } catch (e) { next(e); }
  };
}

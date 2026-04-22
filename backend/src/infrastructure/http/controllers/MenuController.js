export class MenuController {
  constructor({ gestionarMenuUseCase }) {
    this.gestionarMenuUseCase = gestionarMenuUseCase;
  }

  listar = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const productos = await this.gestionarMenuUseCase.listar(id_local);
      res.json({ ok: true, data: productos });
    } catch (e) { next(e); }
  };

  agregar = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const producto = await this.gestionarMenuUseCase.agregar(id_local, req.body);
      res.status(201).json({ ok: true, data: producto });
    } catch (e) { next(e); }
  };

  editar = async (req, res, next) => {
    try {
      const producto = await this.gestionarMenuUseCase.editar(req.params.id, req.body);
      res.json({ ok: true, data: producto });
    } catch (e) { next(e); }
  };

  eliminar = async (req, res, next) => {
    try {
      await this.gestionarMenuUseCase.eliminar(req.params.id);
      res.json({ ok: true, message: 'Producto eliminado.' });
    } catch (e) { next(e); }
  };
}

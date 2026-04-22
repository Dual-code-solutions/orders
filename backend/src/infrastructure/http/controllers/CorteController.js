export class CorteController {
  constructor({ cerrarDiaUseCase, corteRepository }) {
    this.cerrarDiaUseCase = cerrarDiaUseCase;
    this.corteRepository = corteRepository;
  }

  obtenerActivo = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const corte = await this.corteRepository.obtenerActivo(id_local);
      res.json({ ok: true, data: corte });
    } catch (e) { next(e); }
  };

  cerrar = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      const corte = await this.cerrarDiaUseCase.ejecutar(id_local);
      res.json({ ok: true, data: corte });
    } catch (e) { next(e); }
  };
}

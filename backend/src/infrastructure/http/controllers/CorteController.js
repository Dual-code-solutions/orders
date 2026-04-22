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

  abrir = async (req, res, next) => {
    try {
      const id_local = process.env.LOCAL_ID_TIMUCUY;
      // Verificar si ya hay uno activo
      let corte = await this.corteRepository.obtenerActivo(id_local);
      if (corte) {
        return res.status(400).json({ ok: false, message: 'Ya existe un día abierto.' });
      }
      
      corte = await this.corteRepository.crear({
        id_local,
        fecha: new Date(),
        cerrado: false,
      });
      res.status(201).json({ ok: true, data: corte });
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

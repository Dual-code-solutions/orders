import { Corte } from '../domain/entities/Corte.js';

export class CerrarDiaUseCase {
  constructor({ corteRepository }) {
    this.corteRepository = corteRepository;
  }

  async ejecutar(id_local) {
    const corteData = await this.corteRepository.obtenerActivo(id_local);
    if (!corteData) throw new Error('No hay un corte activo para cerrar.');

    const corte = new Corte(corteData);
    corte.cerrarCorte(); // Aplica regla de dominio

    await this.corteRepository.cerrar(corte.id, corte.fecha_cierre);

    return corte;
  }
}

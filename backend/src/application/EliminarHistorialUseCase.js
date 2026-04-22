export class EliminarHistorialUseCase {
  constructor({ corteRepository }) {
    this.corteRepository = corteRepository;
  }

  async ejecutar(corte_id) {
    const corte = await this.corteRepository.obtenerPorId(corte_id);
    if (!corte) throw new Error('El corte no existe.');
    if (!corte.cerrado) throw new Error('No se puede eliminar un corte activo.');

    await this.corteRepository.eliminar(corte_id);
  }
}

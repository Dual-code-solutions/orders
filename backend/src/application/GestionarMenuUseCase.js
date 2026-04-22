export class GestionarMenuUseCase {
  constructor({ productoRepository }) {
    this.productoRepository = productoRepository;
  }

  async listar(id_local) {
    return await this.productoRepository.listar(id_local);
  }

  async agregar(id_local, datos) {
    if (!datos.nombre) throw new Error('El nombre del producto es requerido.');
    if (datos.precio_base < 0) throw new Error('El precio no puede ser negativo.');
    return await this.productoRepository.crear({ ...datos, id_local });
  }

  async editar(id, datos) {
    if (datos.precio_base !== undefined && datos.precio_base < 0) {
      throw new Error('El precio no puede ser negativo.');
    }
    return await this.productoRepository.actualizar(id, datos);
  }

  async eliminar(id) {
    return await this.productoRepository.eliminar(id);
  }
}

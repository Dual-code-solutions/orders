export class Corte {
  constructor({ id, id_local, fecha, cerrado = false, fecha_cierre = null }) {
    this.id = id;
    this.id_local = id_local;
    this.fecha = fecha;
    this.cerrado = cerrado;
    this.fecha_cierre = fecha_cierre;
  }

  cerrarCorte() {
    if (this.cerrado) throw new Error('El corte ya está cerrado.');
    this.cerrado = true;
    this.fecha_cierre = new Date();
  }
}

export class PedidoAdm {
  constructor({ id, corte_id, cliente = 'Cliente', fecha_hora = new Date(), total = 0, detalles = [] }) {
    this.id = id;
    this.corte_id = corte_id;
    this.cliente = cliente;
    this.fecha_hora = fecha_hora;
    this.total = total;
    this.detalles = detalles;
  }
}

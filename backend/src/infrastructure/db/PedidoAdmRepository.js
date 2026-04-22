import { supabase } from './supabaseClient.js';

export class PedidoAdmRepository {
  async crear(datos) {
    const { data, error } = await supabase
      .from('pedido_adm')
      .insert([datos])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('pedido_adm')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async listarPorCorte(corte_id) {
    const { data, error } = await supabase
      .from('pedido_adm')
      .select('*')
      .eq('corte_id', corte_id)
      .order('fecha_hora', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }
}

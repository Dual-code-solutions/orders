import { supabase } from './supabaseClient.js';

export class CorteRepository {
  async obtenerActivo(id_local) {
    const { data, error } = await supabase
      .from('cortes')
      .select('*')
      .eq('id_local', id_local)
      .eq('cerrado', false)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('cortes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async crear(datos) {
    const { data, error } = await supabase
      .from('cortes')
      .insert([datos])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async cerrar(id, fecha_cierre) {
    const { data, error } = await supabase
      .from('cortes')
      .update({ cerrado: true, fecha_cierre })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async listar(id_local) {
    const { data, error } = await supabase
      .from('cortes')
      .select('*')
      .eq('id_local', id_local)
      .order('fecha', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async eliminar(id) {
    const { error } = await supabase
      .from('cortes')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}

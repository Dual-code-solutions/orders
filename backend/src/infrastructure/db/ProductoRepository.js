import { supabase } from './supabaseClient.js';

export class ProductoRepository {
  async listar(id_local) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id_local', id_local)
      .order('nombre', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }

  async obtenerPorId(id) {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async crear(datos) {
    const { data, error } = await supabase
      .from('productos')
      .insert([datos])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async actualizar(id, datos) {
    const { data, error } = await supabase
      .from('productos')
      .update(datos)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async eliminar(id) {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async listarCategorias(id_local) {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('id_local', id_local)
      .order('nombre', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  }
}

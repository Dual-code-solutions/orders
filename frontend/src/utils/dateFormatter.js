export const parseUTC = (dateStr) => {
  if (!dateStr) return new Date();
  // Si la fecha ya trae indicación de zona horaria, la pasamos tal cual
  if (dateStr.endsWith('Z') || dateStr.includes('+')) {
    return new Date(dateStr);
  }
  // Si es solo fecha (YYYY-MM-DD), forzar hora local para evitar desfase de zona horaria
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + 'T00:00:00');
  }
  // Si tiene hora pero sin zona horaria, asumir UTC (viene de Supabase)
  return new Date(dateStr + 'Z');
};

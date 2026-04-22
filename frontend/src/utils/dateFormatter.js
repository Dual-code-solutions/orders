export const parseUTC = (dateStr) => {
  if (!dateStr) return new Date();
  // Si la fecha ya trae la indicación de zona horaria, la pasamos tal cual
  if (dateStr.endsWith('Z') || dateStr.includes('+')) {
    return new Date(dateStr);
  }
  // Si no trae zona horaria, asumimos que viene de Supabase en UTC
  return new Date(dateStr + 'Z');
};

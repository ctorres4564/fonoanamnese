export function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  
  const today = new Date();
  const birthDate = new Date(birthDateString);
  
  // Trata caso de data inválida
  if (isNaN(birthDate.getTime())) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  // Se o mês atual for anterior ao mês de nascimento,
  // ou se for o mesmo mês mas o dia atual for anterior ao dia de nascimento,
  // subtrai 1 da idade.
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return Math.max(0, age);
}

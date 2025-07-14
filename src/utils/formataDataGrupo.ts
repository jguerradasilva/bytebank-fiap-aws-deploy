export function formatarDataGrupo(dataStr: string): string {  
  const hoje = new Date();
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);
 
  const hojeZero = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );
  const dataZero = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate()
  );

  const diffTime = hojeZero.getTime() - dataZero.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';

  return dataZero.toLocaleDateString('pt-BR');
}
import type { Extrato } from 'src/types/Extrato';

export function agruparPorData(itens: Extrato[]): Record<string, Extrato[]> {
  return itens?.reduce(
    (acc, item) => {
      const chave = item.data;
      if (!acc[chave]) acc[chave] = [];
      acc[chave].push(item);
      return acc;
    },
    {} as Record<string, Extrato[]>
  );
}

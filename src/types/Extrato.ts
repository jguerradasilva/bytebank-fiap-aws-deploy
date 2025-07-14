export interface Extrato {
  id: string;
  tipo: string;
  descricao: string;
  horario: string;
  valor: number;
  icone: string;
  data: string;
  conta: 'conta-corrente' | 'conta-poupança';
}

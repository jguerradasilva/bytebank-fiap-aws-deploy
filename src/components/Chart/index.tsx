import { useQueryGetExtrato } from '@hooks/useQueryExtrato';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

interface ChartViewProps {
  data: string;
  entrada: number;
  saida: number;
  saldo: number;
}

export default function ChartView() {
  const { data: extrato = [] } = useQueryGetExtrato();

  const dados: ChartViewProps[] = useMemo(() => {
    const agrupado: Record<string, { entrada: number; saida: number }> = {};

    extrato.forEach((item) => {
      if (!item.data || typeof item.valor !== 'number') return;

      const dataKey = item.data;
      if (!agrupado[dataKey]) {
        agrupado[dataKey] = { entrada: 0, saida: 0 };
      }

      if (item.valor >= 0) {
        agrupado[dataKey].entrada += item.valor;
      } else {
        agrupado[dataKey].saida += Math.abs(item.valor);
      }
    });

    let saldoAcumulado = 0;

    return Object.entries(agrupado)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([data, valores]) => {
        saldoAcumulado += valores.entrada - valores.saida;

        return {
          data: data.split('-').reverse().join('/'),
          entrada: parseFloat(valores.entrada.toFixed(2)),
          saida: parseFloat(valores.saida.toFixed(2)),
          saldo: parseFloat(saldoAcumulado.toFixed(2)),
        };
      });
  }, [extrato]);

  return (
    <div
      style={{
        width: '100%',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dados.length === 0 ? (
        <p style={{ color: '#999' }}>
          Nenhum movimento encontrado para exibir no gráfico.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={dados}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend />
            <Bar dataKey="entrada" name="Entradas" fill="#4caf50" />
            <Bar dataKey="saida" name="Saídas" fill="#f44336" />
            <Line
              dataKey="saldo"
              name="Saldo acumulado"
              stroke="#1976d2"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

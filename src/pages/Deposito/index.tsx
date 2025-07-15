import Title from '@components/Title';
import { Box, TextField, Typography } from '@mui/material';
import CButton from '@components/CButton';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { useMutationPostExtrato } from '@hooks/useQueryExtrato';
import { Loading } from '@components/Loading';
import { NumericFormat } from 'react-number-format';

export default function PageDeposito() {
  const [contaDeposito, setContaDeposito] = useState('');
  const [valor, setValor] = useState('');
  const postMutation = useMutationPostExtrato()
  const [loading, setLoading] = useState(false);

  function handleConta(conta: string) {
    setContaDeposito(conta);
  }

  async function handleConcluir() {
    if (!valor || !contaDeposito) {
      toast.warning('Preencha o valor e selecione a conta.');
      return;
    }

    const valorNumerico = Number(valor.replace(',', '.').replace('R$', '').trim());
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      toast.warning('Digite um valor válido para depósito.');
      return;
    }

    try {
      setLoading(true);

      await postMutation.mutateAsync({
        values: {
          tipo: 'Depósito',
          descricao: contaDeposito === 'conta-corrente' ? 'Conta Corrente' : 'Conta Poupança',
          horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          valor: valorNumerico,
          icone: 'AttachMoneyIcon',
          data: new Date().toISOString().slice(0, 10),
          conta: contaDeposito,
        }
      });

      toast.success('Depósito realizado com sucesso!', {
        position: 'top-right',
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });

      setValor('');
      setContaDeposito('');

      await new Promise((resolve) => setTimeout(resolve, 500));

    } catch (e) {
      console.error('Erro ao realizar a transferência:', e);
      toast.error('Erro ao realizar a transferência.');
    } finally {
      setLoading(false);
    }


  }

  return (
    <>
      <Loading show={loading} />
      <Title title="Realizar depósito" />

      <Box sx={{ p: 3, bgcolor: '#ffffff' }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
          Qual valor deseja depositar?
        </Typography>

        <NumericFormat
          placeholder="R$"
          size="small"
          fullWidth
          variant='standard'
          customInput={TextField}
          value={valor}
          prefix="R$ "
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) => setValor(values.value)}
          sx={{ mb: 4 }}
          slotProps={{
            input: {
              disableUnderline: false,
            },
            inputLabel: {
              color: 'error',
            },
          }}
        />

        <Box sx={{ mb: 4, width: '100%' }}>
          <Typography sx={{ mb: 1, fontWeight: 'bold' }}>
            Em qual conta você depositará esse valor?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <CButton
              color={contaDeposito === 'conta-corrente' ? 'info' : 'inherit'}
              text="conta-corrente"
              onClick={() => handleConta('conta-corrente')}
            />
            <CButton
              color={contaDeposito === 'conta-poupança' ? 'info' : 'inherit'}
              text="conta-poupança"
              onClick={() => handleConta('conta-poupança')}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CButton color="primary" text="Concluir" onClick={handleConcluir} />
        </Box>
      </Box>
    </>
  );
}
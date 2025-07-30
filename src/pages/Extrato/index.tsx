import Title from '@components/Title';
import { Box } from '@mui/material';
import ExtratoList from '@components/ExtratoList';
import FiltrosRapidos from '@components/FiltroRapido';

export default function PageExtrato() {

  return (
    <>
      <Title title="Extrato da conta-corrente" />

      <FiltrosRapidos />

      <Box
        sx={{
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#ffffff',
        }}
      >
        <ExtratoList />
      </Box>
    </>
  );
}
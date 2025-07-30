import React, { useMemo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  IconButton,
  Box,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ButtonServices from '@components/ButtonServices';
import type { Extrato } from 'src/types/Extrato';
import { NumericFormat } from 'react-number-format'
import {
  useMutationDeleteExtrato,
  useMutationUpdateExtrato,
  useQueryGetExtrato,
} from '@hooks/useQueryExtrato';
import { agruparPorData } from '@utils/agrupaPorData';
import { Slide, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatarDataGrupo } from '@utils/formataDataGrupo';
import { formatarValor } from '@utils/formataValor';
import { getIconComponent } from '@utils/getIconComponent';
import { Loading } from '@components/Loading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/store';
import { isHoje, isNosUltimos7Dias, isOntem } from '@utils/dataUtils';

export default function ExtratoList() {
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novoValor, setNovoValor] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { data } = useQueryGetExtrato();
  const updateMutate = useMutationUpdateExtrato();
  const deleteMutate = useMutationDeleteExtrato();

  const filtro = useSelector((state: RootState) => state.extratoFilter.filtroData);
  const busca = useSelector((state: RootState) => state.extratoFilter.filtroBusca.toLowerCase());

  const dataFiltrada = useMemo(() => {
    if (!data) return [];

    return data
      .filter((item) => {
        switch (filtro) {
          case 'hoje':
            return isHoje(item.data);
          case 'ontem':
            return isOntem(item.data);
          case 'ultimos7dias':
            return isNosUltimos7Dias(item.data);
          default:
            return true;
        }
      })
      .filter((item) => {
        if (!busca) return true;

        const texto = `${item.tipo} ${item.descricao} ${item.valor} ${item.data}`.toLowerCase();
        return texto.includes(busca);
      });
  }, [data, filtro, busca]);

  const grupos = agruparPorData(dataFiltrada);

  const datasOrdenadas = grupos
    ? Object.keys(grupos).sort((a, b) => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    })
    : [];

  function handleEditClick(item: Extrato) {
    setEditandoId(item.id);
    setNovoValor(item.valor.toString().replace('.', ','));
  }

  async function handleUpdate(item: Extrato) {
    if (!item) return;

    const valorSanitizado = novoValor
      .replace('R$', '')
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();

    const valorNumber = Number(valorSanitizado);

    if (isNaN(valorNumber)) {
      toast.error('Valor inválido!');
      return;
    }

    try {
      setLoading(true);

      await updateMutate.mutateAsync({ id: item.id, valor: Number(novoValor) });

      toast.success('Extrato atualizado com sucesso.', {
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

      setEditandoId(null);
      setNovoValor('');
    } catch (e) {
      console.error('Erro ao atualizar:', e);
      toast.error('Erro ao atualizar o extrato.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: Extrato) {
    if (!item) return;

    try {
      const result = await Swal.fire({
        title: 'Você tem certeza?',
        html: `<p>Esta ação removerá o extrato. Deseja continuar?</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, remover!',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#236B7A',
      });

      if (result.isConfirmed) {
        setLoading(true);

        await deleteMutate.mutateAsync({ id: item.id });

        toast.success('Extrato excluído com sucesso.', {
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
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (e) {
      console.error('Erro ao excluir:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setEditandoId(null);
    setNovoValor('');
  }

  return (
    <>
      <Loading show={loading} />
      <Box
        sx={{
          width: '100%',
          mx: 2,
          maxHeight: '60vh',
          overflowY: 'auto',
          scrollbarGutter: 'stable',
          borderRadius: 2,
          p: 1,
        }}
      >
        <List
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {datasOrdenadas.map((data) => (
            <React.Fragment key={data}>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  ml: 2,
                  fontWeight: 600,
                }}
              >
                {formatarDataGrupo(data)}
              </Typography>
              {grupos[data]
                .slice()
                .sort((a, b) =>
                  a.horario < b.horario ? 1 : a.horario > b.horario ? -1 : 0
                )
                .map((item) => {
                  const isNegative = item.valor < 0;
                  const isEditing = editandoId === item.id;
                  return (
                    <ListItem
                      key={item.id}
                      secondaryAction={
                        isEditing ? (
                          <>
                            <IconButton
                              edge="end"
                              aria-label="save"
                              sx={{ color: '#388e3c', mr: 2 }}
                              onClick={() => handleUpdate(item)}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="cancel"
                              sx={{ color: '#d32f2f' }}
                              onClick={handleCancel}
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              sx={{ color: '#000', mr: 2 }}
                              onClick={() => handleEditClick(item)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              sx={{ color: '#000' }}
                              onClick={() => handleDelete(item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )
                      }
                      sx={{
                        flexWrap: 'wrap',
                      }}
                    >
                      <ListItemAvatar sx={{ mr: 2 }}>
                        <ButtonServices
                          icon={React.createElement(getIconComponent(item.icone))}
                          disabled
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.tipo}
                        secondary={
                          <>
                            <Typography component="span" variant="inherit">
                              {item.descricao}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption">
                              {item.horario}
                            </Typography>
                          </>
                        }
                        sx={{
                          flex: 2,
                          '& .MuiListItemText-primary': { color: '#000' },
                          '& .MuiListItemText-secondary': { color: '#000' },
                        }}
                      />
                      <ListItemText
                        secondary={
                          isEditing ? (
                            <NumericFormat
                              size="small"
                              customInput={TextField}
                              value={novoValor}
                              prefix="R$ "
                              thousandSeparator="."
                              decimalSeparator=","
                              onValueChange={(values) => setNovoValor(values.value)
                              }
                              sx={{ width: 90 }}
                            />
                          ) : (
                            formatarValor(item.valor)
                          )
                        }
                        sx={{
                          '& .MuiListItemText-secondary': (theme) => ({
                            color: isNegative
                              ? theme.palette.error.main
                              : theme.palette.success.main,
                            fontWeight: 600,
                          }),
                          textAlign: 'center',
                        }}
                      />
                    </ListItem>
                  );
                })}
            </React.Fragment>
          ))}
          {datasOrdenadas.length === 0 && (
            <Typography
              variant="body1"
              sx={{
                width: '100%',
                textAlign: 'center',
                mt: 4,
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              Nenhum resultado encontrado. 
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
}

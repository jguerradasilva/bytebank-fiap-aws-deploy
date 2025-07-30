import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@store/store';
import { setFiltroBusca } from '@store/ExtratoFilter';


export default function FiltroBuscaExtrato() {
  const dispatch = useDispatch();
  const busca = useSelector((state: RootState) => state.extratoFilter.filtroBusca);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFiltroBusca(e.target.value));
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Buscar por tipo, descrição, valor..."
      value={busca}
      fullWidth
      onChange={handleChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }
      }}
      sx={{ maxWidth: 400 }}
    />
  );
}

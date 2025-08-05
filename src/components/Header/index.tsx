import { Box, IconButton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@store/Auth';
import { useDispatch } from 'react-redux';

export default function HeaderComponent() {
  const user: string = 'Usuário';
  const dispatch = useDispatch();

  function handleLogout() {
    sessionStorage.removeItem('token');
    dispatch(logout());
    window.location.reload();
  }

  return (
    <Box
      component="header"
      sx={{
        bgcolor: '#236B7A',
        backgroundImage: 'linear-gradient(45deg, #12120F, transparent)',
        color: '#FAFAFA',
        width: '100%',
        height: '56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircleIcon sx={{ marginRight: '8px', color: 'white' }} />
        <Typography variant="h5">Olá, {user}</Typography>
      </Box>

      <IconButton onClick={handleLogout}>
        <LogoutIcon sx={{ color: '#ffffff' }} />
      </IconButton>
    </Box>
  );
}

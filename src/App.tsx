import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from '@styles/useTheme';
import '@styles/App.css';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';

export default function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Routes />
    </ThemeProvider>
  );
}

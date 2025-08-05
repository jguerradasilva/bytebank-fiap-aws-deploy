import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import MainContainer from '@components/Container';

export function Layout() {
  return (
    <Box>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Box>
  );
}

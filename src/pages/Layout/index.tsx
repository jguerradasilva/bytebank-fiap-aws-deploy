import MainContainer from "@components/Container";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "@tanstack/react-router";

export function Layout() {
  const location = useLocation()

  const isPageHome = location.pathname === '/'

  return (
    <Box>
      {isPageHome ? (
        <Outlet />
      ) : (
        <MainContainer>
          <Outlet />
        </MainContainer>
      )}
    </Box>
  )
}
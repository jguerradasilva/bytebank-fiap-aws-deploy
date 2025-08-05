import MainContainer from "@components/Container";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export function Layout() {

  return (
    <Box>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Box>
  )
}
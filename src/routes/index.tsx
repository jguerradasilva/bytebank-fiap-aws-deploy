import PageBoleto from "@pages/Boleto";
import PageDashboard from "@pages/Dashboard";
import PageDeposito from "@pages/Deposito";
import PageExtrato from "@pages/Extrato";
import { Layout } from "@pages/Layout";
import PageNotFound from "@pages/NotFound";
import PageTransferir from "@pages/Transferir";
import { Route, Routes } from "react-router";



export default function Rotas() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<PageDashboard />} />
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path="/boleto" element={<PageBoleto />} />
        <Route path="/deposito" element={<PageDeposito />} />
        <Route path="/extrato" element={<PageExtrato />} />
        <Route path="/transferir" element={<PageTransferir />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )

}



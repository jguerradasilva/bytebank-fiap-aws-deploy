import PageBoleto from '@pages/Boleto';
import PageDashboard from '@pages/Dashboard';
import PageDeposito from '@pages/Deposito';
import PageExtrato from '@pages/Extrato';
import PageHome from '@pages/Home';
import { Layout } from '@pages/Layout';
import PageNotFound from '@pages/NotFound';
import PageTransferir from '@pages/Transferir';
import { Navigate, Route, Routes } from 'react-router';
import PublicRoute from './public.routes';
import PrivateRoute from '@utils/privateRoute';

export default function Rotas() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <PageDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/boleto"
          element={
            <PrivateRoute>
              <PageBoleto />
            </PrivateRoute>
          }
        />
        <Route
          path="/deposito"
          element={
            <PrivateRoute>
              <PageDeposito />
            </PrivateRoute>
          }
        />
        <Route
          path="/extrato"
          element={
            <PrivateRoute>
              <PageExtrato />
            </PrivateRoute>
          }
        />
        <Route
          path="/transferir"
          element={
            <PrivateRoute>
              <PageTransferir />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      <Route
        path="/home"
        element={
          <PublicRoute>
            <PageHome />
          </PublicRoute>
        }
      />

      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

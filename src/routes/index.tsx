import PageBoleto from '@features/boleto/pages';
import PageDashboard from '@features/dashboard/pages';
import PageDeposito from '@features/deposito/pages';
import PageExtrato from '@features/extrato/pages';
import PageHome from '@features/home/pages';
import { Layout } from '@features/common/pages/Layout';
import PageNotFound from '@features/common/pages/NotFound';
import PageTransferir from '@features/transferencia/pages';
import { Navigate, Route, Routes } from 'react-router';
import { PrivateRoute, PublicRoute } from '@shared/components';

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

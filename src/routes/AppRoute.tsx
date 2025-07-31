import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/dashboard/HomePage";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import type { ReactNode } from "react";
import TopUpPage from "@/pages/dashboard/TopUpPage";
import ServicePage from "@/pages/dashboard/ServicePage";
import TransactionPage from "@/pages/dashboard/TransactionPage";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path=":service_code" element={<ServicePage />} />
        <Route path="topup" element={<TopUpPage />} />
        <Route path="transaction" element={<TransactionPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

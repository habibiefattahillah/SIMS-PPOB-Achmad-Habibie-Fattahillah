import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoute";

export default function App() {
  const { fetchProfile } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  return <AppRoutes />;
}

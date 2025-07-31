import { useDispatch } from "react-redux";
import { setAuth, setUser, logout } from "@/stores/authSlice";
import api from "@/lib/axios";

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    const res = await api.post("/login", { email, password });
    if (res.data.status === 0) {
      dispatch(setAuth({ token: res.data.data.token }));
      return true;
    }
    return false;
  };

  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const res = await api.post("/registration", data);
    return res.data.status === 0;
  };

  const fetchProfile = async () => {
    const res = await api.get("/profile");
    if (res.data.status === 0) {
      dispatch(setUser(res.data.data));
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { login, register, fetchProfile, logoutUser };
};

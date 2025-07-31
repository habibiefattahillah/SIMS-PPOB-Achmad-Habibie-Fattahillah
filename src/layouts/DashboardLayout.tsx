import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/authSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="">
          <NavLink
            to="/dashboard"
            className="flex items-center space-x-2 font-semibold text-lg text-red-500"
            end
          >
            <img src="/src/assets/Logo.png" alt="logo" className="h-6" />
            <span>SIMS PPOB</span>
          </NavLink>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink
            to="/dashboard/topup"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "text-gray-700"
            }
          >
            Top Up
          </NavLink>
          <NavLink
            to="/dashboard/transaction"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "text-gray-700"
            }
          >
            Transaction
          </NavLink>
          <NavLink
            to="/dashboard/akun"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "text-gray-700"
            }
          >
            Akun
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
}

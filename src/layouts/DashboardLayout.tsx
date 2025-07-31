import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="">
          <NavLink
            to="/dashboard"
            className="flex items-center space-x-2 font-semibold text-lg text-red-500"
            end
          >
            <img src="/public/Logo.png" alt="logo" className="h-6" />
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
            to="/dashboard/profile"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "text-gray-700"
            }
          >
            Akun
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </main>
    </div>
  );
}

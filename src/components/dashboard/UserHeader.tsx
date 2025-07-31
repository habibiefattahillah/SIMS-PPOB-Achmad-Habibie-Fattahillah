import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import BalanceCard from "@/components/dashboard/BalanceCard";

export default function UserHeader() {
  const user = useSelector((state: RootState) => state.auth.user);
  const balance = useSelector((state: RootState) => state.balance.value);

  return (
    <div className="flex w-full justify-between">
      <div className="flex-col items-center space-x-4 w-full">
        <img
          src={"/src/assets/Profile Photo.png"}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-500">Selamat datang,</p>
          <h1 className="text-3xl font-semibold">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
      </div>
      <div className="w-full">
        <BalanceCard balance={balance} />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  balance: number;
}

export default function BalanceCard({ balance }: Props) {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => setShowBalance((prev) => !prev);

  return (
    <div className="bg-red-500 text-white rounded-xl p-4 shadow-md relative overflow-hidden">
      <p className="text-sm">Saldo anda</p>

      <h2 className="text-2xl font-bold mt-1">
        {showBalance ? `Rp ${balance.toLocaleString("id-ID")}` : "••••••••"}
      </h2>

      <button
        onClick={toggleBalance}
        className="mt-2 underline text-sm flex items-center gap-1"
      >
        {showBalance ? (
          <>
            Tutup Saldo <EyeOff size={16} />
          </>
        ) : (
          <>
            Lihat Saldo <Eye size={16} />
          </>
        )}
      </button>
    </div>
  );
}

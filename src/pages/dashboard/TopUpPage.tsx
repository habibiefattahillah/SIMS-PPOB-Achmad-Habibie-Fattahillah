"use client";

import { useState } from "react";
import UserHeader from "@/components/dashboard/UserHeader";
import { postTopUp } from "@/lib/api/transaction";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopUpPage() {
  const navigation = useNavigate();
  const [amount, setAmount] = useState<number | "">("");
  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const MIN_TOPUP = 10000;
  const MAX_TOPUP = 1000000;

  const isValidAmount =
    typeof amount === "number" && amount >= MIN_TOPUP && amount <= MAX_TOPUP;

  const handleTopUp = async () => {
    if (!isValidAmount) return;
    try {
      await postTopUp({ top_up_amount: amount });
      toast.success("Top up berhasil");
      setAmount("");
      navigation("/dashboard");
    } catch (err) {
      toast.error("Top up gagal");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <UserHeader />

      <div className="mb-12">
        <p className="text-lg font-semibold">Silahkan masukan</p>
        <h2 className="text-2xl font-bold">Nominal Top Up</h2>
      </div>

      <div className="md:flex justify-between space-x-2 space-y-2">
        <div className="w-full space-y-2">
          <div className="relative">
            <input
              type="number"
              placeholder="Masukkan nominal Top Up"
              className="w-full p-2 pl-10 border rounded-md"
              value={amount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (isNaN(val)) setAmount("");
                else setAmount(val);
              }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <CreditCard size={20} />
            </span>
          </div>

          <button
            disabled={!isValidAmount}
            onClick={handleTopUp}
            className={`w-full py-2 rounded-md text-white ${
              isValidAmount
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Top Up
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          {presetAmounts.map((nominal) => (
            <button
              key={nominal}
              onClick={() => setAmount(nominal)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Rp{nominal.toLocaleString("id-ID")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

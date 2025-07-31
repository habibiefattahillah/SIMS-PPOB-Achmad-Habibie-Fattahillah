import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "@/components/dashboard/UserHeader";
import { getBalance, postTransaction } from "@/lib/api/transaction";
import { getServices } from "@/lib/api/information";
import { toast } from "sonner";
import type { Service } from "@/types/api";
import { CreditCard } from "lucide-react";

export default function ServicePage() {
  const navigate = useNavigate();

  const { service_code } = useParams<{ service_code: string }>();
  const [balance, setBalance] = useState(0);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    getBalance().then(setBalance);
    getServices().then((services) => {
      const found = services.find((s) => s.service_code === service_code);
      if (!found) {
        toast.error("Layanan tidak ditemukan");
        return;
      }
      setService(found);
    });
  }, [service_code]);

  const handleBayar = async () => {
    if (!service) return;

    try {
      await postTransaction({
        service_code: service.service_code,
      });
      toast.success("Transaksi berhasil");
      getBalance().then(setBalance);
      navigate(`/dashboard`);
    } catch (err) {
      toast.error("Transaksi gagal");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <UserHeader balance={balance} />

      {service ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="w-6 h-6 object-contain"
              />
              <p className="text-lg font-semibold">{service.service_name}</p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={`Rp${service.service_tariff.toLocaleString("id-ID")}`}
                readOnly
                className="w-full p-2 pl-10 border rounded-md bg-gray-100"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <CreditCard size={20} />
              </span>
            </div>

            <button
              onClick={handleBayar}
              className="w-full py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
            >
              Bayar
            </button>
          </div>
        </div>
      ) : (
        <p>Layanan tidak ditemukan...</p>
      )}
    </div>
  );
}

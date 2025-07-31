import { useEffect, useState } from "react";
import { getBalance } from "@/lib/api/transaction";
import { getBanners, getServices } from "@/lib/api/information";
import type { Banner, Service } from "@/types/api";
import UserHeader from "@/components/dashboard/UserHeader";
import ServiceGrid from "@/components/dashboard/ServiceGrid";
import BannerCarousel from "@/components/dashboard/BannerCarousel";

export default function HomePage() {
  const [balance, setBalance] = useState<number>(0);
  const [services, setServices] = useState<Service[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    getBalance().then(setBalance);
    getServices().then(setServices);
    getBanners().then(setBanners);
  }, []);

  return (
    <div className="p-4 space-y-6">
      <UserHeader balance={balance} />

      <ServiceGrid services={services} />

      <BannerCarousel banners={banners} />
    </div>
  );
}

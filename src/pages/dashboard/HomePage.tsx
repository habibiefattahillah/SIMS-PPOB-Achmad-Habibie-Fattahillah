import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/stores/store";
import { fetchBanners, fetchServices } from "@/stores/informationSlice";
import { fetchBalance } from "@/stores/balanceSlice";

import UserHeader from "@/components/dashboard/UserHeader";
import ServiceGrid from "@/components/dashboard/ServiceGrid";
import BannerCarousel from "@/components/dashboard/BannerCarousel";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      <UserHeader />
      <ServiceGrid />
      <BannerCarousel />
    </div>
  );
}

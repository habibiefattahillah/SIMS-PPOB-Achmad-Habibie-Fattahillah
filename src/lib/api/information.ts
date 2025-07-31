import api from "@/lib/axios";
import type { Banner, Service } from "@/types/api";

export const getBanners = async (): Promise<Banner[]> => {
  const res = await api.get<{ data: Banner[] }>("/banner");
  return res.data.data;
};

export const getServices = async (): Promise<Service[]> => {
  const res = await api.get<{ data: Service[] }>("/services");
  return res.data.data;
};

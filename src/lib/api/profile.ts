import api from "@/lib/axios";
import type { ProfileResponse } from "@/types/api";

export const getProfile = async (): Promise<ProfileResponse> => {
  const res = await api.get<{ data: ProfileResponse }>("/profile");
  return res.data.data;
};

export const updateProfile = async (data: {
  first_name: string;
  last_name: string;
}): Promise<ProfileResponse> => {
  const res = await api.put<{ data: ProfileResponse }>("/profile/update", data);

  return res.data.data;
};

export const updateProfileImage = async (
  file: File
): Promise<ProfileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.put<{ data: ProfileResponse }>(
    "/profile/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.data;
};

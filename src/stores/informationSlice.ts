import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBanners, getServices } from "@/lib/api/information";
import type { Banner, Service } from "@/types/api";

interface InformationState {
  banners: Banner[];
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: InformationState = {
  banners: [],
  services: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "information/fetchBanners",
  async () => {
    return await getBanners();
  }
);

export const fetchServices = createAsyncThunk(
  "information/fetchServices",
  async () => {
    return await getServices();
  }
);

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch banners";
        state.loading = false;
      })

      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch services";
        state.loading = false;
      });
  },
});

export default informationSlice.reducer;

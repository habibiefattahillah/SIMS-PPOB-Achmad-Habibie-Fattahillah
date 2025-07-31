import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalance } from "@/lib/api/transaction";

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    const balance = await getBalance();
    return balance;
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 0,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchBalance.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default balanceSlice.reducer;

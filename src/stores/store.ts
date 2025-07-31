import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import balanceReducer from "./balanceSlice";
import informationReducer from "./informationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    information: informationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
}

export const store = makeStore();

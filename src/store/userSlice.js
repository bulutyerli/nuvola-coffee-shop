// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signedIn: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInAction: (state) => {
      state.signedIn = true;
      state.error = false;
    },
    signInFailure: (state) => {
      state.signedIn = false;
      state.error = true;
    },
    signOutAction: (state) => {
      state.signedIn = false;
      state.error = false;
    },
    signOutFailure: (state) => {
      state.signedIn = true;
      state.error = true;
    },
  },
});
export const { signInAction, signOutAction, signOutFailure, signInFailure } =
  userSlice.actions;

export default userSlice.reducer;

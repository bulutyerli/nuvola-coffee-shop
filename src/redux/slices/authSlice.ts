// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';

interface UserAttributes {
  name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

interface AuthState {
  user: UserAttributes | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
  await signOut();
  return null;
});

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (): Promise<UserAttributes | null> => {
    const user = await fetchUserAttributes();
    return user;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, User} from '../../types/auth.types';
import {loginThunk, verifyOtpThunk, logoutThunk} from '../thunks/authThunks';

const initialState: AuthState = {
  user: null,
  token: null,
  tempToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.tempToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tempToken = 'otp-pending';
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(verifyOtpThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.tempToken = null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(logoutThunk.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.tempToken = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const {logout, clearError, setToken, setUser} = authSlice.actions;
export default authSlice.reducer;


import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

interface UserState {
  userData: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (!response.success) {
      return rejectWithValue(response);
    }
    deleteCookie('accessToken');
    localStorage.clear();
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (state) => state.userData,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.userData = action.payload.user;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.loading = false;
      state.userData = null;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
  }
});

export const userReducer = userSlice.reducer;
export const { selectUserData, selectIsAuthChecked, selectAuthenticated } =
  userSlice.selectors;

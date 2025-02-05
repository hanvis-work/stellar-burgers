import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getFeed.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFeed.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const { selectFeed } = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;

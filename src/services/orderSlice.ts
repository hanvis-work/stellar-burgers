import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

interface OrderState {
  ordersList: TOrder[];
  orderData: TOrder | null;
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
}

export const initialState: OrderState = {
  ordersList: [],
  orderData: null,
  loading: false,
  error: null,
  orderRequest: false
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => await getOrdersApi()
);

export const getOrderData = createAsyncThunk(
  'order/getOrderData',
  async (number: number) => await getOrderByNumberApi(number)
);

export const newOrder = createAsyncThunk(
  'order/newOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    const response = await orderBurgerApi(ingredients);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return { order: response.order, name: response.name };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData(state) {
      state.orderData = null;
    }
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectOrdersList: (state) => state.ordersList,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.ordersList = action.payload;
    });
    builder.addCase(getOrderData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrderData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.loading = false;
      state.orderData = action.payload.orders[0];
    });
    builder.addCase(newOrder.pending, (state) => {
      state.loading = true;
      state.orderRequest = true;
      state.error = null;
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.loading = false;
      state.orderRequest = false;
      state.error = action.error.message as string;
    });
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orderRequest = false;
      state.orderData = action.payload.order;
      state.ordersList.push(action.payload.order);
    });
  }
});

export const { selectOrderData, selectOrderRequest, selectOrdersList } =
  orderSlice.selectors;
export const { clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: IIngredientsState) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const { selectIngredients } = ingredientsSlice.selectors;

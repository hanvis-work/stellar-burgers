import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorBurgers',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredient: (state, action) => {
      const item = state.ingredients[action.payload.startPosition];
      state.ingredients[action.payload.startPosition] =
        state.ingredients[action.payload.startPosition + action.payload.shift];
      state.ingredients[action.payload.startPosition + action.payload.shift] =
        item;
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorBurgers: (state) => state
  }
});

export const constructorBurgersReducer = constructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearIngredients
} = constructorSlice.actions;
export const { selectConstructorBurgers } = constructorSlice.selectors;

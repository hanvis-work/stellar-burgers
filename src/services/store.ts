import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredientsSlice';
import { constructorBurgersReducer } from './constructorSlice';
import { feedReducer } from './feedSlice';
import { orderReducer } from './orderSlice';
import { userReducer } from './userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurgers: constructorBurgersReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

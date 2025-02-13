import { describe, test } from '@jest/globals';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '../ingredientsSlice';

describe('Тест слайса: ingredients', () => {
  const resultData = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  test('Тест редьюсера слайса ingredients: pending', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredients.pending('')
    );

    expect(newState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  test('Тест редьюсера слайса ingredients: rejected', () => {
    const testError = new Error('Что-то пошло не так');
    const newState = ingredientsReducer(
      initialState,
      getIngredients.rejected(testError, '')
    );

    expect(newState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Что-то пошло не так'
    });
  });

  test('Тест редьюсера слайса ingredients: fulfilled', () => {
    const newState = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(resultData, '')
    );

    expect(newState).toEqual({
      ingredients: resultData,
      loading: false,
      error: null
    });
  });
});

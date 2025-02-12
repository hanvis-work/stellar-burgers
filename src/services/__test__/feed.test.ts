import { describe, test } from '@jest/globals';
import { feedReducer, getFeed, initialState } from '../feedSlice';

describe('Тест слайса: feed', () => {
  const resultData = {
    orders: [
      {
        _id: '1234567890',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Тестовый бургер',
        createdAt: '2025-02-12T06:18:38.051Z',
        updatedAt: '2025-02-12T06:18:38.711Z',
        number: 68185
      }
    ],
    total: 68185,
    totalToday: 1,
    success: true
  };

  test('Тест редьюсера слайса feed: pending', () => {
    const newState = feedReducer(initialState, getFeed.pending(''));

    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: true,
      error: null
    });
  });

  test('Тест редьюсера слайса feed: rejected', () => {
    const testError = new Error('Что-то пошло не так');
    const newState = feedReducer(initialState, getFeed.rejected(testError, ''));

    expect(newState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: 'Что-то пошло не так'
    });
  });

  test('Тест редьюсера слайса feed: fulfilled', () => {
    const newState = feedReducer(
      initialState,
      getFeed.fulfilled(resultData, '')
    );

    expect(newState).toEqual({
      orders: resultData.orders,
      total: resultData.total,
      totalToday: resultData.totalToday,
      loading: false,
      error: null
    });
  });
});

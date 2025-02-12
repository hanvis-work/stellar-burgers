import { describe, test } from '@jest/globals';
import {
  getOrderData,
  getOrders,
  initialState,
  newOrder,
  orderReducer
} from '../orderSlice';
import { TOrder } from '@utils-types';

describe('Тест слайса: order', () => {
  describe('Тест getOrders', () => {
    const resultData: TOrder[] = [
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
        number: 1
      }
    ];
    test('Тест getOrders: pending', () => {
      const newState = orderReducer(initialState, getOrders.pending(''));
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: false,
        loading: true,
        error: null
      });
    });
    test('Тест getOrders: rejected', () => {
      const testError = new Error('Что-то пошло не так');
      const newState = orderReducer(
        initialState,
        getOrders.rejected(testError, '')
      );
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: false,
        loading: false,
        error: 'Что-то пошло не так'
      });
    });
    test('Тест getOrders: fulfilled', () => {
      const newState = orderReducer(
        initialState,
        getOrders.fulfilled(resultData, '')
      );
      expect(newState).toEqual({
        ordersList: resultData,
        orderData: null,
        orderRequest: false,
        loading: false,
        error: null
      });
    });
  });

  describe('Тест getOrderData', () => {
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
          number: 1
        }
      ],
      success: true
    };
    test('Тест getOrderData: pending', () => {
      const newState = orderReducer(initialState, getOrderData.pending('', 1));
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: false,
        loading: true,
        error: null
      });
    });
    test('Тест getOrderData: rejected', () => {
      const testError = new Error('Что-то пошло не так');
      const newState = orderReducer(
        initialState,
        getOrderData.rejected(testError, '', 1)
      );
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: false,
        loading: false,
        error: 'Что-то пошло не так'
      });
    });
    test('Тест getOrderData: fulfilled', () => {
      const newState = orderReducer(
        initialState,
        getOrderData.fulfilled(resultData, '', 1)
      );
      expect(newState).toEqual({
        ordersList: [],
        orderData: resultData.orders[0],
        orderRequest: false,
        loading: false,
        error: null
      });
    });
  });

  describe('Тест newOrder', () => {
    const resultData = {
      name: 'Тестовый бургер',
      order: {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        _id: '1234567890',
        owner: {},
        status: 'done',
        name: 'Тестовый бургер',
        createdAt: '2025-02-12T06:18:38.051Z',
        updatedAt: '2025-02-12T06:18:38.711Z',
        number: 1,
        price: 68185
      }
    };
    test('Тест newOrder: pending', () => {
      const newState = orderReducer(initialState, newOrder.pending('', []));
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: true,
        loading: true,
        error: null
      });
    });
    test('Тест newOrder: rejected', () => {
      const testError = new Error('Что-то пошло не так');
      const newState = orderReducer(
        initialState,
        newOrder.rejected(testError, '', [])
      );
      expect(newState).toEqual({
        ordersList: [],
        orderData: null,
        orderRequest: false,
        loading: false,
        error: 'Что-то пошло не так'
      });
    });
    test('Тест newOrder: fulfilled', () => {
      const newState = orderReducer(
        initialState,
        newOrder.fulfilled(resultData, '', resultData.order.ingredients)
      );
      expect(newState).toEqual({
        ordersList: [resultData.order],
        orderData: resultData.order,
        orderRequest: false,
        loading: false,
        error: null
      });
    });
  });
});

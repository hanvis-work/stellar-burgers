import { describe, test } from '@jest/globals';
import {
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userReducer
} from '../userSlice';

describe('Тест слайса: user', () => {
  describe('Тест getUser', () => {
    const resultData = {
      user: {
        email: 'test@mail.ru',
        name: 'BurgerTest'
      },
      success: true
    };

    test('Тест getUser: pending', () => {
      const newState = userReducer(initialState, {
        type: getUser.pending.type
      });
      expect(newState.userData).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('Тест getUser: rejected', () => {
      const newState = userReducer(initialState, {
        type: getUser.rejected.type,
        error: new Error('Что-то пошло не так')
      });
      expect(newState.userData).toEqual(null);
      expect(newState.error).toEqual('Что-то пошло не так');
    });

    test('Тест getUser: fulfilled', () => {
      const newState = userReducer(initialState, {
        type: getUser.fulfilled.type,
        payload: resultData
      });
      expect(newState.userData).toEqual(resultData.user);
      expect(newState.isAuthChecked).toEqual(true);
      expect(newState.isAuthenticated).toEqual(true);
    });
  });

  describe('Тест registerUser', () => {
    const resultData = {
      email: 'test@mail.ru',
      name: 'BurgerTest',
      password: 'xyz_1234'
    };

    test('Тест registerUser: pending', () => {
      const newState = userReducer(initialState, {
        type: registerUser.pending.type
      });
      expect(newState.userData).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('Тест registerUser: rejected', () => {
      const newState = userReducer(initialState, {
        type: registerUser.rejected.type,
        error: new Error('Что-то пошло не так')
      });
      expect(newState.userData).toEqual(null);
      expect(newState.error).toEqual('Что-то пошло не так');
    });

    test('Тест registerUser: fulfilled', () => {
      const newState = userReducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: resultData
      });
      expect(newState.userData).toEqual(resultData);
      expect(newState.isAuthChecked).toEqual(true);
      expect(newState.isAuthenticated).toEqual(true);
    });
  });

  describe('Тест loginUser', () => {
    const resultData = {
      email: 'test@mail.ru',
      name: 'BurgerTest',
      password: 'xyz_1234'
    };

    test('Тест loginUser: pending', () => {
      const newState = userReducer(initialState, {
        type: loginUser.pending.type
      });
      expect(newState.userData).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('Тест loginUser: rejected', () => {
      const newState = userReducer(initialState, {
        type: loginUser.rejected.type,
        error: new Error('Что-то пошло не так')
      });
      expect(newState.userData).toEqual(null);
      expect(newState.error).toEqual('Что-то пошло не так');
    });

    test('Тест loginUser: fulfilled', () => {
      const newState = userReducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: resultData
      });
      expect(newState.userData).toEqual(resultData);
      expect(newState.isAuthChecked).toEqual(true);
      expect(newState.isAuthenticated).toEqual(true);
    });
  });

  describe('Тест logoutUser', () => {
    test('Тест logoutUser: pending', () => {
      const newState = userReducer(initialState, {
        type: logoutUser.pending.type
      });
      expect(newState.userData).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('Тест logoutUser: rejected', () => {
      const newState = userReducer(initialState, {
        type: logoutUser.rejected.type,
        error: new Error('Что-то пошло не так')
      });
      expect(newState.userData).toEqual(null);
      expect(newState.error).toEqual('Что-то пошло не так');
    });

    test('Тест logoutUser: fulfilled', () => {
      const newState = userReducer(initialState, {
        type: logoutUser.fulfilled.type
      });
      expect(newState.userData).toEqual(null);
    });
  });

  describe('Тест updateUser', () => {
    const resultData = {
      email: 'test@mail.ru',
      name: 'BurgerTest'
    };
    test('Тест updateUser: pending', () => {
      const newState = userReducer(initialState, {
        type: updateUser.pending.type
      });
      expect(newState.userData).toEqual(null);
      expect(newState.loading).toEqual(true);
    });

    test('Тест updateUser: rejected', () => {
      const newState = userReducer(initialState, {
        type: updateUser.rejected.type,
        error: new Error('Что-то пошло не так')
      });
      expect(newState.userData).toEqual(null);
      expect(newState.error).toEqual('Что-то пошло не так');
    });

    test('Тест updateUser: fulfilled', () => {
      const newState = userReducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: resultData
      });
      expect(newState.userData).toEqual(resultData);
    });
  });
});

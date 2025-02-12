import { describe, test } from '@jest/globals';
import { rootReducer } from '../store';
import store from '../store';

describe('Тестирование rootReducer', () => {
  test('Тест инициализации rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});

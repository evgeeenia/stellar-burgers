import { rootReducer } from '../index';

describe('Инициализация rootReducer', () => {
  it('возвращает начальное комбинированное состояние', () => {
    const state = rootReducer(undefined as any, { type: 'UNKNOWN' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        orderDetails: null,
        orderRequest: false,
        orderFailed: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }
    });
  });
});


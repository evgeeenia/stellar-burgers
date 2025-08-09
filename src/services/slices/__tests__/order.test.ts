import reducer, { createOrder, clearOrder } from '../order';
import { AnyAction } from '@reduxjs/toolkit';

describe('Слайс order', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it('обрабатывает createOrder fulfilled', async () => {
    const orderResponse = {
      success: true,
      order: {
        _id: 'order-1',
        status: 'done',
        name: 'Test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        number: 1,
        ingredients: []
      }
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => orderResponse
    });

    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, { type: createOrder.pending.type } as AnyAction);
    expect(state.orderRequest).toBe(true);
    state = reducer(
      state,
      { type: createOrder.fulfilled.type, payload: orderResponse.order } as AnyAction
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderDetails?.number).toBe(1);

    state = reducer(state, clearOrder());
    expect(state.orderDetails).toBeNull();
  });
});


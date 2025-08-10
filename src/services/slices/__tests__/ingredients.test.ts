import reducer, { fetchIngredients } from '../ingredients';
import { AnyAction } from '@reduxjs/toolkit';

describe('Слайс ingredients', () => {
  it('устанавливает загрузку на pending и сохраняет данные на fulfilled', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, { type: fetchIngredients.pending.type } as AnyAction);
    expect(state.isLoading).toBe(true);
    const payload = [
      {
        _id: '1',
        name: 'x',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 1,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    state = reducer(state, {
      type: fetchIngredients.fulfilled.type,
      payload
    } as AnyAction);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toHaveLength(1);
  });

  it('устанавливает ошибку и завершает загрузку на rejected', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, { type: fetchIngredients.pending.type } as AnyAction);
    state = reducer(state, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка' }
    } as AnyAction);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});


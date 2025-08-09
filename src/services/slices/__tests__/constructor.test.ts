import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructor';
import { TIngredient } from '../../../utils/types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Булка',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Начинка',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('Слайс constructor', () => {
  it('добавляет булку и начинку', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, addIngredient(bun));
    expect(state.bun?._id).toBe('bun-1');
    state = reducer(state, addIngredient(main));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
  });

  it('удаляет ингредиент по uniqueId', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, addIngredient(main));
    const id = state.ingredients[0].uniqueId;
    state = reducer(state, removeIngredient(id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('перемещает ингредиент', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, addIngredient({ ...main, _id: 'm1' } as TIngredient));
    state = reducer(state, addIngredient({ ...main, _id: 'm2' } as TIngredient));
    const fromId = state.ingredients[0].uniqueId;
    state = reducer(state, moveIngredient({ from: 0, to: 1 }));
    expect(state.ingredients[1].uniqueId).toBe(fromId);
  });

  it('очищает конструктор', () => {
    let state = reducer(undefined, { type: 'unknown' });
    state = reducer(state, addIngredient(bun));
    state = reducer(state, addIngredient(main));
    state = reducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});


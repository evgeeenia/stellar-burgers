import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredients';
import constructorSlice from '../slices/constructor';
import orderSlice from '../slices/order';
import userSlice from '../slices/user';
import feedSlice from '../slices/feed';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice,
  user: userSlice,
  feed: feedSlice
});

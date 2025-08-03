import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed';
import { fetchIngredients } from '../../services/slices/ingredients';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, total, totalToday, isLoading, error } = useSelector(
    (state) => state.feed
  );
  const { ingredients, isLoading: isLoadingIngredients } = useSelector(
    (state) => state.ingredients
  );
  useEffect(() => {
    if (ingredients.length === 0 && !isLoadingIngredients) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading]);

  useEffect(() => {
    if (orders.length === 0 && !isLoading) {
      dispatch(fetchFeed());
    }
  }, [dispatch, orders.length, isLoading]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  console.log(orders);
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

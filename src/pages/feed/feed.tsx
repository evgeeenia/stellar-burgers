import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, total, totalToday, isLoading, error } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

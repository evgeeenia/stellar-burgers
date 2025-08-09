import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { getOrderByNumber } from '../../services/slices/order';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const orderLoading = useSelector((state) => state.order.orderRequest);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    if (number && !orderDetails && !orderLoading) {
      dispatch(getOrderByNumber(parseInt(number)));
    }
  }, [dispatch, number, orderDetails, orderLoading]);

  const orderInfo = useMemo(() => {
    if (!orderDetails || !ingredients.length) return null;

    const date = new Date(orderDetails.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderDetails.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderDetails,
      ingredientsInfo,
      date,
      total
    };
  }, [orderDetails, ingredients]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (ingredientsLoading || orderLoading || !orderDetails || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

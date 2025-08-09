import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/order';
import { clearConstructor } from '../../services/slices/constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  const { user } = useSelector((state) => state.user);
  const { orderRequest, orderDetails } = useSelector((state) => state.order);

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((s: number, v: any) => s + v.price, 0),
    [bun, ingredients]
  );

  const onOrderClick = async () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const orderIngredients = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    try {
      await dispatch(createOrder(orderIngredients)).unwrap();
      dispatch(clearConstructor());
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

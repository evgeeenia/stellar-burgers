import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/order';
import { clearConstructor } from '../../services/slices/constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => ({
    bun: state.burgerConstructor.bun,
    ingredients: state.burgerConstructor.ingredients
  }));

  const { user } = useSelector((state) => state.user);
  const { orderRequest, orderDetails } = useSelector((state) => state.order);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: any) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
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
      constructorItems={constructorItems}
      orderModalData={orderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

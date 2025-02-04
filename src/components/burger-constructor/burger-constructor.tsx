import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorBurgers,
  clearIngredients
} from '../../services/constructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrderData,
  newOrder,
  selectOrderData,
  selectOrderRequest
} from '../../services/orderSlice';
import { selectAuthenticated } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorBurgers);

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectAuthenticated);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (constructorItems.ingredients.length === 0) return;

    if (!isAuth) {
      return navigate('/login');
    }

    try {
      const newBurgerItems = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      dispatch(newOrder(newBurgerItems));
      dispatch(clearIngredients());
    } catch (error) {
      console.error(error);
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, selectOrdersList } from '../../services/orderSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrdersList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

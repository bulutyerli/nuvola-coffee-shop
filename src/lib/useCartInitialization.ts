import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCartItems,
  setCartQuantity,
  setCartTotal,
} from '../redux/slices/cartSlice';

const useCartInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('cartList') || '[]');
      const totalPrice = JSON.parse(localStorage.getItem('cartTotal') || '0');
      const totalItems = JSON.parse(
        localStorage.getItem('cartQuantity') || '0'
      );

      dispatch(setCartItems(items));
      dispatch(setCartTotal(totalPrice));
      dispatch(setCartQuantity(totalItems));
    }
  }, [dispatch]);
};

export default useCartInitialization;

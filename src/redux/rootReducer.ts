import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';
import addressSlice from './slices/addressSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  address: addressSlice,
  order: orderSlice,
  auth: authSlice,
});

export default rootReducer;

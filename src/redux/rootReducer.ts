import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';
import addressSlice from './slices/addressSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  address: addressSlice,
  order: orderSlice,
});

export default rootReducer;

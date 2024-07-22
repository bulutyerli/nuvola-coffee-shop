import { combineReducers } from 'redux';
import cartSlice from './slices/cartSlice';
import addressSlice from './slices/addressSlice';

const rootReducer = combineReducers({
  cart: cartSlice,
  address: addressSlice,
});

export default rootReducer;

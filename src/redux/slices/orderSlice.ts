// orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from '@/src/types';

const loadOrderFromLocalStorage = (): OrderState => {
  if (typeof window !== 'undefined') {
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      return JSON.parse(savedOrder);
    }
  }
  return { items: [], totalPrice: 0 };
};

const initialState: OrderState = loadOrderFromLocalStorage();

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem('order', JSON.stringify(state));
    },
    clearOrder: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('order');
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

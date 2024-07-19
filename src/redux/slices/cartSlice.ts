import { CartItem, CartState } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > action.payload.quantity) {
          existingItem.quantity -= action.payload.quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;
export default cartSlice.reducer;

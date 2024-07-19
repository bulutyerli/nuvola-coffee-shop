import { CartItem, CartState } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalPrice: 0,
  totalItems: 0,
};

const calculateTotals = (items: CartItem[]) => {
  let totalPrice = 0;
  let totalItems = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return { totalPrice, totalItems };
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

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    addMore: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
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
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
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
  deleteItem,
  addMore,
} = cartSlice.actions;
export default cartSlice.reducer;

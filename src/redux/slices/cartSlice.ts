// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '@/src/types';

// Utility functions
const calculateTotals = (items: CartItem[]) => {
  let totalPrice = 0;
  let totalItems = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return { totalPrice, totalItems };
};

const setCartListFunc = (
  items: CartItem[],
  totalPrice: number,
  totalItems: number
) => {
  localStorage.setItem('cartList', JSON.stringify(items));
  localStorage.setItem('cartTotal', JSON.stringify(totalPrice));
  localStorage.setItem('cartQuantity', JSON.stringify(totalItems));
};

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  totalPrice: 0,
  totalItems: 0,
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

      setCartListFunc(state.items, state.totalPrice, state.totalItems);
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

      setCartListFunc(state.items, state.totalPrice, state.totalItems);
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

      setCartListFunc(state.items, state.totalPrice, state.totalItems);
    },
    deleteItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;

      setCartListFunc(state.items, state.totalPrice, state.totalItems);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      console.log('Cart cleared in Redux state.');

      setCartListFunc(state.items, state.totalPrice, state.totalItems);
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
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(action.payload);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },
    setCartTotal: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    setCartQuantity: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
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
  setCartItems,
  setCartTotal,
  setCartQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

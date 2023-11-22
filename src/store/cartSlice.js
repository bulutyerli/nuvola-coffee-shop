// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import * as cartThunks from "./cartThunk";

const initialState = {
  cart: [],
  cartCount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(cartThunks.fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.cartCount = action?.payload?.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });

    builder.addCase(cartThunks.fetchCart.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(cartThunks.fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.cart = [];
    });

    builder.addCase(cartThunks.incrementItem.fulfilled, (state, action) => {
      const { productId, sizeId, quantity, price, userId } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.product_id === productId && item.sizeId === sizeId) {
          return { ...item, quantity: item.quantity + parseInt(quantity) };
        } else {
          return item;
        }
      });

      const itemExist = state.cart.find(
        (item) => item.product_id === productId && item.sizeId === sizeId
      );
      if (!itemExist) {
        updatedCart.push({
          product_id: productId,
          sizeId,
          quantity,
          price,
          user_id: userId,
        });
      }
      return {
        ...state,
        cart: updatedCart,
        cartCount: state.cartCount + parseInt(quantity),
      };
    });

    builder.addCase(cartThunks.deleteItem.fulfilled, (state, action) => {
      const { productId, sizeId } = action.payload;
      const deletedItem = state.cart.find(
        (item) => item.product_id === productId && item.sizeId === sizeId
      );
      if (deletedItem) {
        const updatedCart = state.cart.filter(
          (item) => !(item.product_id === productId && item.sizeId === sizeId)
        );
        return {
          ...state,
          cart: updatedCart,
          cartCount: state.cartCount - deletedItem.quantity,
        };
      }
      return state;
    });

    builder.addCase(cartThunks.updateItem.fulfilled, (state, action) => {
      const { productId, sizeId, quantity } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.product_id === productId && item.sizeId === sizeId) {
          return { ...item, quantity };
        } else {
          return item;
        }
      });

      const newCartCount = updatedCart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      return {
        ...state,
        cart: updatedCart,
        cartCount: newCartCount,
      };
    });
  },
});

export default cartSlice.reducer;

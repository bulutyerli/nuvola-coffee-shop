// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/getCart", async (thunkApi) => {
  try {
    const res = await axios.get("/api/cart");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
});

export const incrementItem = createAsyncThunk(
  "cart/incrementItem",
  async ({ productId, sizeId, quantity, price }, thunkApi) => {
    try {
      const res = await axios.post("/api/cart", {
        productId,
        sizeId,
        quantity,
        price,
      });

      return { productId, sizeId, quantity, price };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ id }, thunkApi) => {
    try {
      const res = await axios.delete("/api/cart", {
        data: { id },
      });

      return { id };
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  cart: [],
  cartCount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.cartCount = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });

    builder.addCase(fetchCart.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(incrementItem.fulfilled, (state, action) => {
      const { productId, sizeId, quantity } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.product_id === productId && item.sizeId === sizeId) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
        cartCount: state.cartCount + quantity,
      };
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      const { id } = action.payload;
      const deletedItem = state.cart.find((item) => item.id === id);
      if (deletedItem) {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        return {
          ...state,
          cart: updatedCart,
          cartCount: state.cartCount - deleteItem.quantity,
        };
      }
      return state;
    });
  },
});

export default cartSlice.reducer;

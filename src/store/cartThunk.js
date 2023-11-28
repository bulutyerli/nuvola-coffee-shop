import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/getCart", async (thunkApi) => {
  try {
    const res = await axios.get("/api/cart");

    if (res === undefined) {
      return null;
    }

    return res.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
});

export const incrementItem = createAsyncThunk(
  "cart/incrementItem",
  async ({ productId, sizeId, quantity, price, size }, thunkApi) => {
    try {
      const res = await axios.post("/api/cart", {
        productId,
        sizeId,
        quantity,
        price,
        size,
      });
      const userId = res.data.userId;

      return { productId, sizeId, quantity, price, userId, size };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ productId, sizeId }, thunkApi) => {
    try {
      const res = await axios.delete("/api/cart", {
        data: { productId, sizeId },
      });

      return { productId, sizeId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, sizeId, quantity }, thunkApi) => {
    try {
      const res = await axios.put("/api/cart", {
        productId,
        sizeId,
        quantity,
      });
      const userId = res.data.userId;

      return { productId, sizeId, quantity, userId };
    } catch (error) {
      console.log(error);
    }
  }
);

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
    products: [],
    amount: 0
};
  
// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (line, thunkAPI) => {
      try {
        return await cartService.addToCart(line, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
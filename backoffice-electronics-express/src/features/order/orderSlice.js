import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  orders: [],
  selectedOrder: {},
  orderIsError: false,
  orderISuccess: false,
  orderIsLoading: false, 
  orderMessage: "",
  orderCreated: false, 
};

// Create order
export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (order, thunkAPI) => {
      try {
        return await orderService.createOrder(order);
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

  // Get orders
export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (thunkAPI) => {
      try {
        return await orderService.getAllOrders(token);
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
  
  // Get order by id
  export const getOrderById = createAsyncThunk(
    "order/getOrderById",
    async (id, thunkAPI) => {
      try {
        return await orderService.getOrderById(id, token);
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
  
// Update order
export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async (data, thunkAPI) => {
      try {
        return await orderService.updateOrder(data.id, data.order, token);
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
  

// Cancel order
export const cancelOrder = createAsyncThunk(
    "order/cancelOrder",
    async (id, thunkAPI) => {
      try {
        return await orderService.cancelOrder(id, token);
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

// Delete order
export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (id, thunkAPI) => {
      try {
        return await orderService.deleteOrder(id, token);
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

// add line item to order
export const addLineItem = createAsyncThunk(
    "order/addLineItem",
    async (data, thunkAPI) => {
      try {
        return await orderService.addLineItem(data.oid, data.lid, token);
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

// remove line item from order
export const removeLineItem = createAsyncThunk(
    "order/removeLineItem",
    async (data, thunkAPI) => {
      try {
        return await orderService.removeLineItem(data.oid, data.lid, token);
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

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => {
            state.orderIsLoading = false;
            state.orderISuccess = false;
            state.orderIsError = false;
            state.orderMessage = "";
            state.orderCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
                state.orderCreated = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(getOrderById.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderISuccess = true;
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
                state.selectedOrder = action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(addLineItem.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(addLineItem.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
            })
            .addCase(addLineItem.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(removeLineItem.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(removeLineItem.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
            })
            .addCase(removeLineItem.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.orderIsLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.orderIsLoading = false;
                state.orderISuccess = true;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.orderIsLoading = false;
                state.orderIsError = true;
                state.orderMessage = action.payload;
            });
    },
});
export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lineItemService from "./lineItemService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  lineItems: [],
  allLineItems: [],
  selectedLineItem: {},
  lineItemIsError: false,
  lineItemISuccess: false,
  lineItemIsLoading: false,
  lineItemMessage: "",
  lineItemCreated: false,
};

// Create line item
export const createLineItem = createAsyncThunk(
    "line-item/createLineItem",
    async (line, thunkAPI) => {
      try {
        return await lineItemService.createLineItem(line);
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
  
// Clear line items in state
export const clearLineItems = createAsyncThunk(
  "line-item/clearLineItems",
  async (thunkAPI) => {
    return 1;
  }
);

  // Get all line items
export const getAllLineItems = createAsyncThunk(
    "line-item/getAllLineItems",
    async (thunkAPI) => {
      try {
        return await lineItemService.getAllLineItems();
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
  
  // Get line item by id
  export const getLineItemById = createAsyncThunk(
    "line-item/getLineItemById",
    async (id, thunkAPI) => {
      try {
        return await lineItemService.getLineItemById(id);
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
  
// Update line item
export const updateLineItem = createAsyncThunk(
    "line-item/updateLineItem",
  async (data, thunkAPI) => {
      console.log(data)
      try {
        return await lineItemService.updateLineItem(data.id, data.lineItem);
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

// Delete line item
export const deleteLineItem = createAsyncThunk(
    "line-item/deleteLineItem",
    async (id, thunkAPI) => {
      try {
        return await lineItemService.deleteLineItem(id);
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
  
export const lineItemSlice = createSlice({
    name: "lineItem",
    initialState,
    reducers: {
        reset: (state) => {
            state.lineItemIsLoading = false;
            state.lineItemISuccess = false;
            state.lineItemIsError = false;
            state.lineItemMessage = "";
            state.lineItemCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLineItem.pending, (state) => {
                state.lineItemIsLoading = true;
            })
            .addCase(createLineItem.fulfilled, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemISuccess = true;
                state.lineItemCreated = true;
                state.lineItems.push(action.payload);
            })
            .addCase(createLineItem.rejected, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemIsError = true;
                state.lineItemMessage = action.payload;
            })
            .addCase(getAllLineItems.pending, (state) => {
                state.lineItemIsLoading = true;
            })
            .addCase(getAllLineItems.fulfilled, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemISuccess = true;
                state.allLineItems = action.payload;
            })
            .addCase(getAllLineItems.rejected, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemIsError = true;
                state.lineItemMessage = action.payload;
            })
            .addCase(getLineItemById.pending, (state) => {
                state.lineItemIsLoading = true;
            })
            .addCase(getLineItemById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.lineItemISuccess = true;
                state.selectedLineItem = action.payload;
            })
            .addCase(getLineItemById.rejected, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemIsError = true;
                state.lineItemMessage = action.payload;
            })
            .addCase(updateLineItem.pending, (state) => {
                state.lineItemIsLoading = true;
            })
            .addCase(updateLineItem.fulfilled, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemISuccess = true;
                state.selectedLineItem = action.payload;
                state.lineItems = state.lineItems.map(item =>{
                  return item.lineItemId == action.payload.lineItemId ? action.payload : item;
                });
            })
            .addCase(updateLineItem.rejected, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemIsError = true;
                state.lineItemMessage = action.payload;
            })
            .addCase(deleteLineItem.pending, (state) => {
                state.lineItemIsLoading = true;
            })
            .addCase(deleteLineItem.fulfilled, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemISuccess = true;
                state.lineItems = state.lineItems.filter(item => item.lineItemId != action.payload);
            })
            .addCase(deleteLineItem.rejected, (state, action) => {
                state.lineItemIsLoading = false;
                state.lineItemIsError = true;
                state.lineItemMessage = action.payload;
            })
            .addCase(clearLineItems.pending, (state) => {
              state.lineItemIsLoading = true;
          })
          .addCase(clearLineItems.fulfilled, (state, action) => {
              state.lineItemIsLoading = false;
              state.lineItemISuccess = true;
              state.lineItems = [];
          })
          .addCase(clearLineItems.rejected, (state, action) => {
              state.lineItemIsLoading = false;
              state.lineItemIsError = true;
              state.lineItemMessage = action.payload;
          });
    },
});
export const { reset } = lineItemSlice.actions;
export default lineItemSlice.reducer; 
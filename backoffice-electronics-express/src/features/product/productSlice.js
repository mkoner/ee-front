import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  products: [],
  selectedProduct: {},
  productIsError: false,
  productISuccess: false,
  productIsLoading: false,
  productMessage: "",
  productCreated: false,
};

// Create product
export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (product, thunkAPI) => {
      try {
        return await productService.createProduct(product, token);
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

  // Get products
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (searchString, thunkAPI) => {
      try {
        return await productService.getAllProducts(searchString);
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
  
  // Get products
  export const getAllProducts1 = createAsyncThunk(
    "product/getAllProducts1",
    async (thunkAPI) => {
      try {
        return await productService.getAllProducts1();
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
  
  // Get product id
  export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id, thunkAPI) => {
      try {
        return await productService.getProductById(id);
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
  
// Update product
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data, thunkAPI) => {
      try {
        return await productService.updateProduct(data.id, data.product, token);
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

// Delete product
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, thunkAPI) => {
      try {
        return await productService.deleteProduct(id, token);
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

// add file to product
export const addFiles = createAsyncThunk(
    "product/addFiles",
    async (data, thunkAPI) => {
      try {
        return await productService.addFiles(data.id, data.files, token);
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

// remove file from product
export const deleteFile = createAsyncThunk(
    "product/deleteFile",
    async (data, thunkAPI) => {
      try {
        return await productService.deleteFile(data.pid, data.fid, token);
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

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => {
            state.productIsLoading = false;
            state.productISuccess = false;
            state.productIsError = false;
            state.productMessage = "";
            state.productCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.productIsLoading = false;
                state.productISuccess = true;
                state.productCreated = true;
              state.selectedProduct = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload; 
            })
            .addCase(getAllProducts.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.productIsLoading = false;
                state.productISuccess = true;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload;
            })
            .addCase(getAllProducts1.pending, (state) => {
              state.productIsLoading = true;
          })
          .addCase(getAllProducts1.fulfilled, (state, action) => {
              state.productIsLoading = false;
              state.productISuccess = true;
              state.products = action.payload;
          })
          .addCase(getAllProducts1.rejected, (state, action) => {
              state.productIsLoading = false;
              state.productIsError = true;
              state.productMessage = action.payload;
          })
            .addCase(getProductById.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productISuccess = true;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.productIsLoading = false;
                state.productISuccess = true;
                state.selectedProduct = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload;
            })
            .addCase(addFiles.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(addFiles.fulfilled, (state, action) => {
                state.productIsLoading = false;
                state.productISuccess = true;
            })
            .addCase(addFiles.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload;
            })
            .addCase(deleteFile.pending, (state) => {
                state.productIsLoading = true;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.productIsLoading = false;
                state.productISuccess = true;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.productIsLoading = false;
                state.productIsError = true;
                state.productMessage = action.payload;
            });
    },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;
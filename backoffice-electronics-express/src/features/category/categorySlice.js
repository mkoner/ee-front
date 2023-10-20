import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const token = JSON.parse(localStorage.getItem("token"));


const initialState = {
  categories: [],
  selectedCategory: {},
  categoryIsError: false,
  categoryIsSuccess: false,
  categoryIsLoading: false,
  categoryMessage: "",
  categoryCreated: false,
};

// Create category
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (category, thunkAPI) => {
      try {
        return await categoryService.createCategory(category, token);
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

  // Get all categories
export const getAllCategories = createAsyncThunk(
    "category/getAllCategories",
    async (thunkAPI) => {
      try {
        return await categoryService.getAllCategories();
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
  
  // Get category by id
  export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id, thunkAPI) => {
      try {
        return await categoryService.getCategoryById(id);
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
  
// Update category
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data, thunkAPI) => {
      try {
        return await categoryService.updateCategory(data.id, data.category, token);
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

// Delete category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, thunkAPI) => {
      try {
        return await categoryService.deleteCategory(id, token);
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
  
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        reset: (state) => {
            state.categoryIsLoading = false;
            state.categoryIsSuccess = false;
            state.categoryIsError = false;
            state.categoryMessage = "";
            state.categoryCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.categoryIsLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsSuccess = true;
                state.categoryCreated = true;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(getAllCategories.pending, (state) => {
                state.categoryIsLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(getCategoryById.pending, (state) => {
                state.categoryIsLoading = true;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categoryIsSuccess = true;
                state.selectedCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.categoryIsLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsSuccess = true;
                state.selectedCategory = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsError = true;
                state.categoryMessage = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.categoryIsLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsSuccess = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.categoryIsLoading = false;
                state.categoryIsError = true;
                state.categoryMessage = action.payload;
            });
    },
});
export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
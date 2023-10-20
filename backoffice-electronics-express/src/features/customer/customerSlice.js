import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

// Get user from localStorage
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  isLoggedIn: token ? true : false,
  customers: [],
  createdCustomer: {},
  selectedCustomer: {},
  customerIsError: false,
  customerISuccess: false,
  customerIsLoading: false,
  customerMessage: "",
  customerCreated: false,
};

// Create user
export const createUser = createAsyncThunk(
    "customer/createUser",
    async (user, thunkAPI) => {
      try {
        return await customerService.createUser(user);
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
  
  // Login user
  export const login = createAsyncThunk("customer/login", async (user, thunkAPI) => {
    try {
      return await customerService.login(user);
       
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  
  // Log out
  export const logout = createAsyncThunk("customer/logout", async () => {
    await customerService.logout();
  });

  // Get all Users
export const getAllUsers = createAsyncThunk(
    "customer/getAllUsers",
    async (thunkAPI) => {
      try {
        return await customerService.getAllUsers(token);
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
  
  // Get user by id
  export const getUserById = createAsyncThunk(
    "customer/getUserById",
    async (id, thunkAPI) => {
      try {
        return await customerService.getUserById(id, token);
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

  // Get user by number
  export const getUserByNumber = createAsyncThunk(
    "customer/getUserByNumber",
    async (number, thunkAPI) => {
      try {
        return await customerService.getUserByNumber(number);
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
  
// Update user
export const updateUser = createAsyncThunk(
    "customer/updateUser",
    async (data, thunkAPI) => {
      try {
        return await customerService.updateUser(data.id, data.customer, token);
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

// Delete user
export const deleteUser = createAsyncThunk(
    "customer/deleteUser",
    async (id, thunkAPI) => {
      try {
        return await customerService.deleteUser(id, token);
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
  
export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        reset: (state) => {
            state.customerIsLoading = false;
            state.customerISuccess = false;
            state.customerIsError = false;
            state.customerMessage = "";
            state.customerCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.customerIsLoading = false;
                state.customerISuccess = true;
                state.customerCreated = true;
                state.createdCustomer = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.customerIsLoading = false;
                state.customerISuccess = true;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.customerIsLoading = false;
                state.customerISuccess = true;
                state.customers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerISuccess = true;
                state.selectedCustomer = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
            }) 
            .addCase(getUserByNumber.pending, (state) => {
              state.customerIsLoading = true;
          })
          .addCase(getUserByNumber.fulfilled, (state, action) => {
              state.isLoading = false;
              state.customerISuccess = true;
              state.selectedCustomer = action.payload;
          })
          .addCase(getUserByNumber.rejected, (state, action) => {
              state.customerIsLoading = false;
              state.customerIsError = true;
              state.customerMessage = action.payload;
          })
            .addCase(updateUser.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.customerIsLoading = false;
                state.customerISuccess = true;
                state.selectedCustomer = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.customerIsLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.customerIsLoading = false;
                state.customerISuccess = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.customerIsLoading = false;
                state.customerIsError = true;
                state.customerMessage = action.payload;
            });
    },
});
export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
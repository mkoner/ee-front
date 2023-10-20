import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// Get user from localStorage
const token = JSON.parse(localStorage.getItem("token"));



const initialState = {
  isLoggedIn: token ? true : false,
  admins: [],
  selectedAdmin: {},
  adminIsError: false,
  adminISuccess: false,
  adminIsLoading: false,
  adminMessage: "",
  adminCreated: false,
};

// Create user
export const createUser = createAsyncThunk(
    "admin/createUser",
    async (user, thunkAPI) => {
      try {
        return await adminService.createUser(user, token);
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
export const login = createAsyncThunk("admin/login", async (user, thunkAPI) => {
    try {
      return await adminService.login(user);
       
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  
  // Log out
  export const logout = createAsyncThunk("admin/logout", async () => {
    await adminService.logout();
  });

  // Get all Users
export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (thunkAPI) => {
      try {
        return await adminService.getAllUsers(token);
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
    "admin/getUserById",
    async (id, thunkAPI) => {
      try {
        return await adminService.getUserById(id, token);
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
    "admin/updateUser",
    async (data, thunkAPI) => {
      try {
        return await adminService.updateUser(data.id, data.admin, token);
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
    "admin/deleteUser",
    async (id, thunkAPI) => {
      try {
        return await adminService.deleteUser(id, token);
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
  
export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        reset: (state) => {
            state.adminIsLoading = false;
            state.adminISuccess = false;
            state.adminIsError = false;
            state.adminMessage = "";
            state.adminCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.adminIsLoading = false;
                state.adminISuccess = true;
                state.adminCreated = true;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.adminIsLoading = false;
                state.adminISuccess = true;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
                state.isLoggedIn = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.adminIsLoading = false;
                state.adminISuccess = true;
                state.admins = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
            })
            .addCase(getUserById.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.adminISuccess = true;
                state.selectedAdmin = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.adminIsLoading = false;
                state.adminISuccess = true;
                state.selectedAdmin = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.adminIsLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.adminIsLoading = false;
                state.adminISuccess = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.adminIsLoading = false;
                state.adminIsError = true;
                state.adminMessage = action.payload;
            });
    },
});
export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
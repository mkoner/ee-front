import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileService from "./fileService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  files: [],
  selectedFile: {},
  fileIsError: false,
  fileISuccess: false,
  fileIsLoading: false,
  fileMessage: "",
  fileCreated: false,
};

// add file
export const uploadFile = createAsyncThunk(
    "file/uploadFile",
    async (file, thunkAPI) => {
      try {
        return await fileService.uploadFile(file, token);
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

  
  // download file
  export const downloadFile = createAsyncThunk(
    "file/downloadFile",
    async (id, thunkAPI) => {
      try {
        return await fileService.downloadFile(id);
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
  

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        reset: (state) => {
            state.fileIsLoading = false;
            state.fileISuccess = false;
            state.fileIsError = false;
            state.fileMessage = "";
            state.fileCreated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.fileIsLoading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.fileIsLoading = false;
                state.fileISuccess = true;
                state.fileCreated = true;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.fileIsLoading = false;
                state.fileIsError = true;
                state.fileMessage = action.payload;
            })
            .addCase(downloadFile.pending, (state) => {
                state.fileIsLoading = true;
            })
            .addCase(downloadFile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fileISuccess = true;
                state.selectedFile = action.payload;
            })
            .addCase(downloadFile.rejected, (state, action) => {
                state.fileIsLoading = false;
                state.fileIsError = true;
                state.fileMessage = action.payload;
            })
    },
});
export const { reset } = fileSlice.actions;
export default fileSlice.reducer;
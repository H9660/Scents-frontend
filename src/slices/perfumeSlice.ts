import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import perfumeService from "../services/perfumeService";

const defaultperfume = {
  name: "",
  price: 500,
  quantity: "SMALL",
  imageUrl: ""
};

const initialState = {
  perfume: { ...defaultperfume },
  perfumes: [],
  isError: false,
  isSuccess: false,
  perfumeLoading: false,
  message: "",
};

// Create new perfume
export const createperfume = createAsyncThunk(
  "perfume/create",
  async (perfumeData, thunkAPI) => {
    try {
        //   const token = thunkAPI.getState().auth.user.token
      return await perfumeService.createperfume(perfumeData);
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

export const getperfume = createAsyncThunk(
  "perfume/get",
  async (name, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await perfumeService.getperfume(name);
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
// Get all perfumes
export const getperfumes = createAsyncThunk(
  "perfume/getAll",
  async (_, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await perfumeService.getperfumes();
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

// Update perfume
export const updateperfume = createAsyncThunk(
  "perfume/update",
  async (perfumeData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await perfumeService.updateperfume(perfumeData);
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

// Delete user perfume
export const deleteperfume = createAsyncThunk(
  "perfume/delete",
  async (title, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await perfumeService.deleteperfume(title);
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

export const calcBatchPrice = createAsyncThunk(
  "perfume/calcBatchPrice",
  async (data, thunkAPI) => {
    try {
      console.log("slice data is", data)
      // const token = thunkAPI.getState().auth.user.token
      return await perfumeService.calcbatchPrice(data);
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

export const perfumeSlice = createSlice({
  name: "perfume",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(createperfume.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.perfumes.push(action.payload);
      })
      .addCase(createperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getperfumes.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(getperfumes.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.perfumes = action.payload;
      })
      .addCase(getperfumes.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(getperfume.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.perfume = action.payload;
      })
      .addCase(getperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(deleteperfume.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.perfumes = state.perfumes.filter(
          (perfume) => perfume.title !== action.payload.title
        );
      })
      .addCase(deleteperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(updateperfume.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.perfumes = state.perfumes.filter(
          (perfume) => perfume.title !== action.payload.title
        );
      })
      .addCase(updateperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(calcBatchPrice.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(calcBatchPrice.fulfilled, (state) => {
        state.perfumeLoading = false;
      })
      .addCase(calcBatchPrice.rejected, (state) => {
        state.perfumeLoading = false;
      })
  },
});

export const { reset } = perfumeSlice.actions;
export default perfumeSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import perfumeService from "../services/perfumeService.ts";
import { perfumeData, perfumeUpdateDataFormat } from "../types.ts";
const defaultperfume = {
  name: "",
  price: 500,
  quantity: "SMALL",
  imageUrl: "",
  discription: "",
};

const initialState = {
  perfumes: [] as perfumeData[],
  isError: false,
  isSuccess: false,
  perfumeLoading: false,
  message: "",
  currPerfume: { ...defaultperfume },
};

// Create new perfume
export const createperfume = createAsyncThunk(
  "perfume/create",
  async (perfumeData: perfumeData, thunkAPI) => {
    try {
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
  async (name: string, thunkAPI) => {
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
  async (perfumeData: perfumeUpdateDataFormat, thunkAPI) => {
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

export const perfumeSlice = createSlice({
  name: "perfume",
  initialState,
  reducers: {
    reset: () => initialState,
    // here the partial thing is used because I just wanna update the currperfume only
    setCurrentPerfume: (state, action: PayloadAction<Partial<perfumeData>>) => {
      state.currPerfume = { ...state.currPerfume, ...action.payload };
    },
    setAvailablePerfumes: (state, action: PayloadAction<perfumeData[]>) => {
      state.perfumes = action.payload;
    },
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
        state.message = JSON.stringify(action.payload);
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
        state.message = JSON.stringify(action.payload);
      })
      .addCase(getperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(getperfume.fulfilled, (state, action) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
        state.currPerfume = action.payload;
      })
      .addCase(getperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.currPerfume = defaultperfume;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(updateperfume.pending, (state) => {
        state.perfumeLoading = true;
      })
      .addCase(updateperfume.fulfilled, (state) => {
        state.perfumeLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateperfume.rejected, (state, action) => {
        state.perfumeLoading = false;
        state.isError = true;
        state.message = JSON.stringify(action.payload);
      });
  },
});

export const { reset, setCurrentPerfume, setAvailablePerfumes } =
  perfumeSlice.actions;
export default perfumeSlice.reducer;

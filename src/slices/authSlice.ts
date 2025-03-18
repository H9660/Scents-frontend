"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { cartData } from "./types";
import { userDataFormat } from "./types";
const savedUser =
  typeof window !== "undefined" ? localStorage.getItem("savedUser") : null;

const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  otpWait: false,
  cartUpdated: false,
  message: ""
};


export const login = createAsyncThunk(
  // name of an action
  "auth/login",
  // logic of the action creator
  async (user: userDataFormat, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.log(error);
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

export const register = createAsyncThunk(
  // name of an action
  "auth/register",
  // logic of the action creator
  async (user: userDataFormat, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const verifyotp = createAsyncThunk(
  // name of an action
  "auth/verifyotp",
  // logic of the action creator
  async (otp: string, thunkAPI) => {
    try {
      return await authService.verifyOTP(otp);
    } catch (error) {
      console.log(error);
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

export const addToCart = createAsyncThunk(
  // name of an action
  "auth/addtocart",
  // logic of the action creatorat
  async (cart: cartData, thunkAPI) => {
    try {
      return await authService.addtoCart(cart);
    } catch (error) {
      console.log(error);
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

export const getUserCart = createAsyncThunk(
  // name of an action
  "auth/getusercart",
  // logic of the action creatorat
  async (userId: string, thunkAPI) => {
    try {
      return await authService.getuserCart(userId);
    } catch (error) {
      console.log(error);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This reset is an action creator that the reducer is performing on the state
    // We are not resetting the user as we need to persist the userf
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.otpWait = false;
      state.message = "";
    },
    clearError: (state) => {
      state.isError = false;
      state.message = ""; // Clear only error-related state
    },
    resetCartUpdated: (state)=>{
      state.cartUpdated = false
    },
    clearOtpWait: (state)=>{
      state.otpWait = false
    }
  },
  extraReducers: (builder) => {
    // This is to handle the async nature of the asyncThunk function.
    // The objects pending, fulfilled and rejected are indeed action objects
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.otpWait = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.otpWait = true;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.otpWait = false;
        state.message = JSON.stringify(action.payload); // This will be the payload that would be set
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.otpWait = false;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.otpWait = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.otpWait = false;
        state.message = JSON.stringify(action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(verifyotp.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(verifyotp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.otpWait = false;
        state.user = action.payload.user;
      })
      .addCase(verifyotp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = JSON.stringify(action.payload);
        state.otpWait = false;
        state.user = ""
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cartUpdated = true;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })  
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.isLoading = false;
      });
      
  },
});

// Exporting the reducer
export const { reset, clearError, resetCartUpdated, clearOtpWait } = authSlice.actions;
export default authSlice.reducer;

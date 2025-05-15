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
  isLoggedin: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  otpWait: false,
  cartUpdated: false,
  userCart: [],
  message: "" as string  
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
  "auth/register",
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
  "auth/verifyotp",
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
  "auth/addtocart",
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
  "auth/getusercart",
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.otpWait = false;
      state.message = "";
    },
    clearError: (state) => {
      state.isError = false;
      state.message = ""; 
    },
    resetCartUpdated: (state)=>{
      state.cartUpdated = false
    },
    clearOtpWait: (state)=>{
      state.otpWait = false
    }
  },
  extraReducers: (builder) => {
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
        state.isLoggedin=false;
      })
      .addCase(verifyotp.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(verifyotp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedin= true;
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
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload as string; 
      })  
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserCart.rejected, (state) => {
        state.isLoading = false;
      })    
  },
});

export const { reset, clearError, resetCartUpdated, clearOtpWait } = authSlice.actions;
export default authSlice.reducer;

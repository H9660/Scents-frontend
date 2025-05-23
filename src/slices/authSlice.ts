"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { cartData } from "../types";
import { userDataFormat } from "../types";
const savedUser =
  typeof window !== "undefined" ? localStorage.getItem("savedUser") : null;

const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  user: user ? user : null,
  isLoggedin: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  cartUpdated: false,
  userCart: [],
  message: "" as string  
};


export const login = createAsyncThunk(
  "auth/login",
  async (user: userDataFormat, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.log("rror is here" ,error);
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
      state.message = "";
    },
    clearError: (state) => {
      state.isError = false;
      state.message = ""; 
    },
    clearSuccess: (state)=>{
      state.isSuccess = false;
      state.message = "";
    },
    resetCartUpdated: (state)=>{
      state.cartUpdated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;                   
        state.isSuccess  = true;
        state.isLoggedin = true;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isLoggedin = false
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedin=false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "";
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

export const { reset, clearError, resetCartUpdated, clearSuccess} = authSlice.actions;
export default authSlice.reducer;

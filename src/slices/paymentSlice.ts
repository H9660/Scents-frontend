"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../services/paymentService";
const savedUser =
  typeof window !== "undefined" ? localStorage.getItem("savedUser") : null;

const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  user: user ? user : null,
  ispaymentError: false,
  ispaymentSuccess: false,
  ispaymentLoading: false,
};

export const makePayment = createAsyncThunk(
  // name of an action
  "payment/makepayment",
  // logic of the action creator
  async (data, thunkAPI) => {
    try {
      return await paymentService.makepayment(data);
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

export const verifyPayment = createAsyncThunk(
  // name of an action
  "payment/verifypayment",
  // logic of the action creator
  async (data, thunkAPI) => {
    try {
      return await paymentService.verifypayment(data);
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

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    reset: (state) => {
      state.ispaymentLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.ispaymentLoading = true;
      })
      .addCase(makePayment.fulfilled, (state) => {
        state.ispaymentLoading = false;
      })
      .addCase(makePayment.rejected, (state) => {
        state.ispaymentLoading = false;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.ispaymentLoading = true;
        state.ispaymentSuccess = false;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.ispaymentLoading = false;
        state.ispaymentSuccess = true;
        state.ispaymentError = false
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.ispaymentLoading = false;
        state.ispaymentSuccess = false;
        state.ispaymentError = true;
      })
  },
});

// Exporting the reducer
export const { reset} = paymentSlice.actions;
export default paymentSlice.reducer;

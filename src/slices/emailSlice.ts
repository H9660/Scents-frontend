import emailService from "@/services/emailService";
import { emailData } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEmailSent: false,
  message: "",
};

export const sendEmail = createAsyncThunk(
  "email/sendEmail",

  async (data: emailData, thunkAPI) => {
    try {
      return await emailService.sendEmail(data);
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

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.isEmailSent = false;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.isEmailSent = true;
      })
      .addCase(sendEmail.rejected, (state) => {
        state.isEmailSent = false;
      })
  }
});

export default emailSlice.reducer;

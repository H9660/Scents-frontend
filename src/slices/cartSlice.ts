import { createSlice, } from "@reduxjs/toolkit";
const savedUser =
  typeof window !== "undefined" ? localStorage.getItem("savedUser") : null;

const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
  user: user ? user : null,
  cartOpen: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCartDrawer: (state)=>{
        state.cartOpen = !state.cartOpen;
    }
  },
});

// Exporting the reducer
export const { toggleCartDrawer } = cartSlice.actions;
export default cartSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import perfumeReducer from './perfumeSlice'
import paymentReducer from './paymentSlice'
// This store stores the states of all the components and hence it is not dependent anywhere on the UI
export const store = configureStore({
  // This is handling the events
  reducer: {
    perfumes: perfumeReducer,
    auth: authReducer,  // So we are referring to the authSlice.reducer here   // This has a function will we reset the states like isloading is error etc
    payments: paymentReducer
  }, 
})

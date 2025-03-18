import axios from "axios";
import { userDataFormat } from "../slices/types.ts";
import { cartData } from "../slices/types.ts";
const USER_URL = "/api/users/";

const login = async (loginData: userDataFormat) => {
  try {
    const userloginData = {
      phone: loginData.userPhone,
    };
    localStorage.setItem("savedUser", JSON.stringify(userloginData));

    const response = await axios.post(USER_URL + "login", userloginData);
    return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const register = async (registerData: userDataFormat) => {
  try {
    const userRegisterData = {
      name: registerData.userName,
      phone: registerData.userPhone,
    };

    localStorage.setItem("savedUser", JSON.stringify(userRegisterData));
    const response = await axios.post(USER_URL + "register", userRegisterData);
    return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const verifyOTP = async (otp: string) => {
  try {
    const savedUser = localStorage.getItem("savedUser");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    if (!parsedUser) {
      throw new Error("No saved user found in localStorage.");
    }

    const verifyOtpData = {
      otp: otp,
      name: parsedUser.name || "Guest",
      phone: parsedUser.phone,
    };
    const response = await axios.post(USER_URL + "verifyotp", verifyOtpData);
    if (response.data.user) {
      localStorage.setItem("savedUser", JSON.stringify(response.data.user));
      return response.data.user;
    } else return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const logout = async () => {
  localStorage.removeItem("user");
  console.log("User Removed");
};

const addtoCart = async (data: cartData) => {
  try {
    const userCart = {
      userId: data.userId,
      cart: data.cart,
    };
    const response = await axios.patch(USER_URL + "updatecart", userCart);
    return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const getuserCart = async (userId: string) => {
  try {
    const response = await axios.get(USER_URL + "getCart", {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (err: unknown) {
    console.log(err)
  }
};

const authService = {
  register,
  logout,
  login,
  verifyOTP,
  addtoCart,
  getuserCart,
};
export default authService;

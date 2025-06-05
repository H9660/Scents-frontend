import { userDataFormat } from "../types.ts";
import { cartData } from "../types.ts";
import axios from "axios";
const API_URL = "api/users/";
const login = async (loginData: userDataFormat) => {
  const userloginData = {
    phone: loginData.userPhone,
    password: loginData.userPassword,
  };

  const response = await axios.post(API_URL + "login", userloginData);
  console.log(response);
  localStorage.setItem("savedUser", JSON.stringify(response.data));
  return response.data;
};

const register = async (registerData: userDataFormat) => {
  const userRegisterData = {
    name: registerData.userName,
    phone: registerData.userPhone,
    password: registerData.userPassword,
  };

  const safeData = { ...userRegisterData };
  delete safeData.password;

  localStorage.setItem("savedUser", JSON.stringify(safeData));

  const response = await axios.post(API_URL + "register", userRegisterData);
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("savedUser");
  console.log("User Removed");
};

const addtoCart = async (data: cartData) => {
  const userCart = {
    userId: data.userId,
    cart: data.cart,
  };
  const response = await axios.patch(API_URL + "updatecart", userCart);
  return response.data;
};

const getuserCart = async (userId: string) => {
  const response = await axios.get(API_URL + "getCart", {
    params: {
      userId: userId,
    },
  });
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  addtoCart,
  getuserCart,
};
export default authService;

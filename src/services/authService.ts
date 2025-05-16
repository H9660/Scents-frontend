import axios from "axios";
import { userDataFormat } from "../slices/types.ts";
import { cartData } from "../slices/types.ts";
const USER_URL = "/api/users/";

const login = async (loginData: userDataFormat) => {
    const userloginData = {
      phone: loginData.userPhone,
      password: loginData.userPassword,
    };

    const response = await axios.post(USER_URL + "login", userloginData, { withCredentials: true });
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

    const { password, ...safeData } = userRegisterData;
    localStorage.setItem("savedUser", JSON.stringify(safeData));
    console.log(password)
    const response = await axios.post(USER_URL + "register", userRegisterData, {withCredentials: true});
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
    const response = await axios.patch(USER_URL + "updatecart", userCart);
    return response.data;
};

const getuserCart = async (userId: string) => {
    const response = await axios.get(USER_URL + "getCart", {
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

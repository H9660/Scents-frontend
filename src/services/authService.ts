import axios from "axios";
const USER_URL = "/api/users/";

interface userDataFormat {
  userPhone?: string;
  userName: string;
}
 interface cartData {
  userId?: string, 
  cart:  Record<string, number>
 }
const login = async (loginData: userDataFormat) => {
  const userloginData = {
    phone: loginData.userPhone,
  };
  localStorage.setItem("savedUser", JSON.stringify(userloginData));
  const response = await axios.post(USER_URL + "login", userloginData);
  return response.data;
};

const register = async (registerData: userDataFormat) => {
  const userRegisterData = {
    name: registerData.userName,
    phone: registerData.userPhone,
  };

  localStorage.setItem("savedUser", JSON.stringify(userRegisterData));
  const response = await axios.post(USER_URL + "register", userRegisterData);
  return response.data;
};

const verifyOTP = async (otp: string) => {
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
};

const logout = async () => {
  localStorage.removeItem("user");
  console.log("User Removed");
};

const addtoCart = async (data: cartData) => {
  const userCart = {
    userId: data.userId,
    cart: data.cart
  }
  const response = await axios.patch(USER_URL + "updatecart", userCart);
  return response.data;
};

const getuserCart = async (userId: string) => {
  const response = await axios.get(USER_URL + "getCart",
  {
    params: {
      userId: userId,
    }});
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  verifyOTP,
  addtoCart,
  getuserCart
};
export default authService;

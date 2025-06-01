// axiosConfig.ts
import axios from "axios";
import { getCookie } from "@/utils/getCookie";
// Create an instance
const axiosInstance = axios.create({
  baseURL: process.env.API_KEY, // Replace with your backend URL
  withCredentials: true, // Important for sending cookies
});

// Attach CSRF token from cookie to every request
axiosInstance.interceptors.request.use(async (config) => {
  const csrfToken = await getCookie("XSRF-TOKEN");
  if (csrfToken && config.headers) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default axiosInstance;

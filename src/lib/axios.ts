import axios from "axios";
import envVars from "@/config/env";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: envVars.BASE_URL,
});

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

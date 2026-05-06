import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // ✅ base URL
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// ✅ Request Interceptor (attach token if needed)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // optional

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (central error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("SERVER ERROR:", error.response.data);
      return Promise.reject(new Error(error.response.data?.message || "Server Error"));
    }

    if (error.request) {
      console.error("NETWORK ERROR");
      return Promise.reject(new Error("Network Error"));
    }

    return Promise.reject(new Error(error.message));
  }
);

export default axiosInstance;
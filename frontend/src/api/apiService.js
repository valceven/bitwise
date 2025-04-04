import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create a reusable axios instance with default settings
const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials in requests
});

apiService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;
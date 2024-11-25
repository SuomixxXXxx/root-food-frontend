import axios from "axios";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => {
    console.log("hi from succes axios");

    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `/api/v1/auth/refresh?refreshToken=${localStorage.getItem(
            "refreshToken"
          )}`
        );
        console.log("hi from error axios");
        localStorage.setItem("token", response.data.token);
        return instance.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);

export default instance;

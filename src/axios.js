import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../axios.js";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const login = createAsyncThunk("/api/v1/auth/login", async (params) => {
  const response = await authService.post(
    `api/v1/auth/authenticate?login=${params.login}&password=${params.password}`
  );
  return response;
});

export const signup = createAsyncThunk(
  "/api/v1/auth/register",
  async (params) => {
    console.log("params", params.name);
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      params
    );
    return response;
  }
);

export const checkAuth = createAsyncThunk("/api/v1/auth/refresh", async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/refresh?refreshToken=${localStorage.getItem(
        "refreshToken"
      )}`
    );
    localStorage.setItem("token", response.data.token);
    console.log(localStorage.getItem("token"));
    console.log("response", response.data.token);
    return response;
  } catch (error) {
    if (error.response.status ===403 || error.response.status ===500){
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }

});

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      })
      .addCase(checkAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(checkAuth.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      })
      .addCase(signup.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(signup.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const login = createAsyncThunk(
  "/api/v1/auth/login",
  async (params) => {
    const response = await axios.post(
      `api/v1/auth/authenticate?login=${params.login}&password=${params.password}`
    );
    return response;
  }
);

export const checkAuth = createAsyncThunk("/api/v1/auth/refresh", async () => {
  const response = await axios.post(
    `api/v1/auth/refresh?refreshToken=${localStorage.getItem("refreshToken")}`
  );
  return response;
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
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

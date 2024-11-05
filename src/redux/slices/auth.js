import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../axios.js";
import { STATUS } from "../../constants.js";

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
    const response = await authService.post(
      `/api/v1/auth/register`,
      params
    );
    return response;
  }
);

export const checkAuth = createAsyncThunk("/api/v1/auth/refresh", async () => {
  try {
    const response = await authService.post(
      `/api/v1/auth/refresh?refreshToken=${localStorage.getItem(
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
      localStorage.removeItem("role");
    }
  }

});

const initialState = {
  data: null,
  status: STATUS.PENDING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      })
      .addCase(checkAuth.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      })
      .addCase(signup.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(signup.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;

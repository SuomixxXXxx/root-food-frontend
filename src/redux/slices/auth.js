import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAtuh = createAsyncThunk(
  "/api/v1/auth/fetchAtuh",
  async (params) => {
    const response = await axios.post(`api/v1/auth/authenticate?login=${params.login}&password=${params.password}`,);
    return response;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAtuh.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAtuh.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAtuh.rejected, (state) => {
        state.data = null;
        state.status = "failed";
      });
  },
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

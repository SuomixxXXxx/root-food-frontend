import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchDishItems = createAsyncThunk(
  "/dishItems/get/fetchDishItems",
  async () => {
    const response = await axios.get("dishItems/get");
    return response;
  }
);

const initialState = {
  dishItems: {
    items: [],
    status: "loading",
  },
};

const dishItemSlice = createSlice({
  name: "dishItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishItems.pending, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = "loading";
      })
      .addCase(fetchDishItems.fulfilled, (state, action) => {
        state.dishItems.items = action.payload;
        state.dishItems.status = "loaded";
      })
      .addCase(fetchDishItems.rejected, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = "failed";
      });
  },
});

export const dishItemReducer = dishItemSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCategories = createAsyncThunk(
  "/categories/get/fetchCategories",
  async () => {
    const response = await axios.get("categories/get?active=false");
    return response;
  }
);

const initialState = {
  categories: {
    items: [],
    status: "loading",
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.items = [];
        state.categories.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.items = action.payload;
        state.categories.status = "loaded";
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.items = [];
        state.categories.status = "failed";
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { STATUS } from "../../constants.js";

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
    status: STATUS.PENDING,
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
        state.categories.status = STATUS.PENDING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.items = action.payload;
        state.categories.status = STATUS.FULFILLED;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories.items = [];
        state.categories.status = STATUS.REJECTED;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

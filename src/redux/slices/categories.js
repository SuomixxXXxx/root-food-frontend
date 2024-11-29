import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { STATUS } from "../../constants.js";

export const fetchCategories = createAsyncThunk(
  "/categories/get/fetchCategories",
  async () => {
    const response = await axios.get("categories/get?active=false");
    // console.log(response)
    return response;
  }
);

export const addCategoryData = createAsyncThunk(
  "/categories/create/addCategoryData",
  async (categoryData) => {
    try {
      const response = await axios.post("categories/create", categoryData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadImagePost = createAsyncThunk(
  "/categories/upload-picture/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post("categories/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
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

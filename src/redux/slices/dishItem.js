import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

const BASE_URL = "http://localhost:8080";

export const fetchDishItems = createAsyncThunk(
  "/dishItems/get/fetchDishItems",
  async () => {
    try {
      const response = await axios.get("dishItems/get");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDishItemsByName = createAsyncThunk(
  "/dishItems/fetchDishItemsByName",
  async (params) => {
    try {
      const response = await axios.get(`dishItems/getByName?name=${params.name}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchDishItemsByCategory = createAsyncThunk(
  "dishItems/getByCategory?",
  async (categoryId) => {
    try {
      const response = await axios.get(
        `dishItems/getByCategory?categoryId=${categoryId}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  dishItems: {
    items: [],
    search: [],
    status: "loading",
    searchStatus: "loading"
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
      })
      .addCase(fetchDishItemsByCategory.pending, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = "loading";
      })
      .addCase(fetchDishItemsByCategory.fulfilled, (state, action) => {
        state.dishItems.items = action.payload;
        state.dishItems.status = "loaded";
      })
      .addCase(fetchDishItemsByCategory.rejected, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = "failed";
      })
      .addCase(fetchDishItemsByName.pending, (state) => {
        state.dishItems.search = [];
        state.dishItems.searchStatus = "loading";
      })
      .addCase(fetchDishItemsByName.fulfilled, (state, action) => {
        state.dishItems.search = action.payload;
        state.dishItems.searchStatus = "loaded";
      })
      .addCase(fetchDishItemsByName.rejected, (state) => {
        state.dishItems.search = [];
        state.dishItems.searchStatus = "failed";
      });
  },
});

export const dishItemReducer = dishItemSlice.reducer;

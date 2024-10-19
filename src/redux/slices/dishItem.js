import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

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
      });
  },
});

export const dishItemReducer = dishItemSlice.reducer;

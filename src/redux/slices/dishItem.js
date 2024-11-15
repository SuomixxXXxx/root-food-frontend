import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { STATUS } from "../../constants.js";

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
export const addProductData = createAsyncThunk(
  "/dishItems/create/addProductData",
  async (productData) => {
    try {
      const response = await axios.post("dishItems/create", productData,{
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      }
    );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadImagePost = createAsyncThunk(
  "/dishItems/upload-picture/uploadImage",
  async (formData) => {
    try {
      const response = await axios.post("dishItems/upload-picture", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
      },
      }  
      );
      console.log(response);
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
export const fetchAutocompleteSuggestions = createAsyncThunk(
  "/dishItems/fetchAutocompleteSuggestions",
  async (params) => {
      try {
          const response = await axios.get(`dishItems/getByName?name=${params.name}`);
          return response.data; 
      } catch (error) {
          console.error(error);  
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
    autocompleteSuggestions:[],
    status: STATUS.PENDING,
    searchStatus: STATUS.PENDING,
    autocompleteSuggestionsStatus: STATUS.PENDING

  },
  selectedItem: null,
  isNavigated: false,
};

const dishItemSlice = createSlice({
  name: "dishItems",
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload; 
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
    setNavigated(state, action) {
      state.isNavigated = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishItems.pending, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = STATUS.PENDING;
      })
      .addCase(fetchDishItems.fulfilled, (state, action) => {
        state.dishItems.items = action.payload;
        state.dishItems.status = STATUS.FULFILLED;
      })
      .addCase(fetchDishItems.rejected, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = STATUS.REJECTED;
      })
      .addCase(fetchDishItemsByCategory.pending, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = STATUS.PENDING;
      })
      .addCase(fetchDishItemsByCategory.fulfilled, (state, action) => {
        state.dishItems.items = action.payload;
        state.dishItems.status = STATUS.FULFILLED;
      })
      .addCase(fetchDishItemsByCategory.rejected, (state) => {
        state.dishItems.items = [];
        state.dishItems.status = STATUS.REJECTED;
      })
      .addCase(fetchDishItemsByName.pending, (state) => {
        state.dishItems.search = [];
        state.dishItems.searchStatus = STATUS.PENDING;
      })
      .addCase(fetchDishItemsByName.fulfilled, (state, action) => {
        state.dishItems.search = action.payload;
        state.dishItems.searchStatus = STATUS.FULFILLED;
      })
      .addCase(fetchDishItemsByName.rejected, (state) => {
        state.dishItems.search = [];
        state.dishItems.searchStatus = STATUS.REJECTED;
      })
      .addCase(fetchAutocompleteSuggestions.pending, (state) => {
        state.dishItems.autocompleteSuggestions = [];
        state.dishItems.autocompleteSuggestionsStatus = STATUS.PENDING;
      })
      .addCase(fetchAutocompleteSuggestions.fulfilled, (state, action) => {
        state.dishItems.autocompleteSuggestions = action.payload;
        state.dishItems.autocompleteSuggestionsStatus = STATUS.FULFILLED;
      })
      .addCase(fetchAutocompleteSuggestions.rejected, (state) => {
        state.dishItems.autocompleteSuggestions = [];
        state.dishItems.autocompleteSuggestionsStatus = STATUS.REJECTED;
      })
  },
});

export const dishItemReducer = dishItemSlice.reducer;
export const { setSelectedItem, clearSelectedItem, setNavigated } = dishItemSlice.actions;
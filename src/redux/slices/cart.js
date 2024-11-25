import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../axios.js";
import { STATUS } from "../../constants.js";

export const orderCreate = createAsyncThunk("/order/create", async (params) => {
  try {
    const response = await authService.post(`order/create`, params);
    console.log(response, "returned value");
    return response;
  } catch (error) {
    alert(error.response.data.message);
    console.log(error);
  }
});

const initialState = {
  items: [],
  amount: 0,
  totalPrice: 0,
  status: STATUS.PENDING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          unitPrice: action.payload.price,
        });
      }
      state.amount += 1;
      state.totalPrice += action.payload.price;
      console.log(state.items.totalQuantity + "quan");
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.price -= existingItem.unitPrice;
        console.log(existingItem.quantity);
      } else {
        state.items = state.items.filter(
          (item) => item.name !== action.payload.name
        );
      }
      state.amount -= 1;
      state.totalPrice -= existingItem.unitPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.amount = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(orderCreate.fulfilled, (state) => {
        state.status = STATUS.FULFILLED;
      })
      .addCase(orderCreate.rejected, (state) => {
        state.status = STATUS.REJECTED;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

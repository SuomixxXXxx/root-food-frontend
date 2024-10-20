import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  amount: 0,
  totalPrice: 0,
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
        state.items.push(action.payload);
      }
      state.amount += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.price -= action.payload.price / action.payload.quantity;
        console.log(existingItem.quantity);
      } else {
        state.items = state.items.filter(
          (item) => item.name !== action.payload.name
        );
      }
      state.amount -= 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

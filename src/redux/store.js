import { configureStore } from "@reduxjs/toolkit";
import { dishItemReducer } from "./slices/dishItem";
import { authReducer } from "./slices/auth";
import { categoriesReducer } from "./slices/categories";
import { cartReducer } from "./slices/cart";
import storage from "redux-persist/lib/storage"
import {persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import orderReducer from "./slices/order";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ['cart', 'dishItems']
}

const reducer = combineReducers({
  dishItems: dishItemReducer,
  auth: authReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  order: orderReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

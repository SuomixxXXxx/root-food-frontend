import { configureStore } from "@reduxjs/toolkit";
import { dishItemReducer } from "./slices/dishItem";
import { authReducer } from "./slices/auth";
import { categoriesReducer } from "./slices/categories";
const store = configureStore({
  reducer: {
    dishItems: dishItemReducer,
    auth: authReducer,
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

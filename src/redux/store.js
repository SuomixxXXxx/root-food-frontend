import { configureStore } from "@reduxjs/toolkit";
import { dishItemReducer } from "./slices/dishItem";

const store = configureStore({
  reducer: {
    dishItems: dishItemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { dishItemReducer } from "./slices/dishItem";
import { authReducer } from "./slices/auth";
const store = configureStore({
  reducer: {
    dishItems: dishItemReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

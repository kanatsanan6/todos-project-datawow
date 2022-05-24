import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

// initialize store
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// defind type of RootState and AppDispatch from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

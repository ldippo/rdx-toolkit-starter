import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./post";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  posts: postSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

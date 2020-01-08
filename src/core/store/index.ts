import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { postSlice } from "./post";

const rootReducer = combineReducers({
  posts: postSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

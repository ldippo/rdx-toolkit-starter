import { createSlice } from "@reduxjs/toolkit";
import { PostState, Post } from "./model";
import {
  makeCrudItemEffectTriplets,
  makeCrudListEffectTriplets
} from "../util";

export const initialState: PostState = {
  data: {},
  error: null,
  loading: false
};

export const postCrudSlice = makeCrudItemEffectTriplets<Post>(
  "Post",
  initialState
);

export const postListCrudSlice = makeCrudListEffectTriplets<Post>(
  "Post",
  initialState
);

export const postSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    getAllPostSuccess(state, action) {
      const { data } = action.payload;
      return {
        data,
        loading: false,
        error: null
      };
    },
    getAllPostFailure(state, action) {
      const { error } = action.payload;
      return {
        loading: false,
        error,
        data: state.data
      };
    },
    getAllPostLoading(state) {
      return {
        loading: true,
        error: null,
        data: state.data
      };
    }
  },
  extraReducers: {
    ...postCrudSlice.slice.caseReducers,
    ...postListCrudSlice.slice.caseReducers
  }
});

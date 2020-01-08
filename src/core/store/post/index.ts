import { createSlice } from "@reduxjs/toolkit";
import { PostState, Post } from "./model";
import { AppThunk } from "../models";

const initialState: PostState = {};

export const postSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    getPostSuccess(state, action) {
      const { id, data } = action.payload;
      return {
        ...state,
        [id]: {
          loading: false,
          data,
          err: null
        }
      };
    },
    getPostFailure(state, action) {
      const { id, err } = action.payload;
      return {
        ...state,
        [id]: {
          loading: false,
          data: null,
          err
        }
      };
    },
    getPostLoading(state, action) {
      const { id } = action.payload;
      return {
        ...state,
        [id]: {
          loading: true,
          data: state[id] ? state[id].data : null,
          err: state[id] ? state[id].err : null
        }
      };
    }
  }
});

export const fetchPost = (id: number): AppThunk => async dispatch => {
  dispatch(postSlice.actions.getPostLoading({ id }));

  const handleSuccess = (data: Post) =>
    dispatch(postSlice.actions.getPostSuccess({ id, data }));

  const handleError = (err: Error) =>
    dispatch(postSlice.actions.getPostFailure({ id, err }));

  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

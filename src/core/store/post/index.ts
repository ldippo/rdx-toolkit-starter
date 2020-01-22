import { createSlice, createAction } from "@reduxjs/toolkit";
import { PostState, Post } from "./model";
import { AppThunk } from "../models";
import { normalizeData, makeCrudEffectTriplets } from "../util";

const initialState: PostState = {
  data: {},
  error: null,
  loading: false
};

export const postCrudSlice = makeCrudEffectTriplets<Post>("Post", initialState);

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
    ...postCrudSlice.slice.caseReducers
  }
});

// TODO - break out into a service file and update codegen templates
export const fetchPost = (id: number): AppThunk => async dispatch => {
  const { getLoading, getSuccess, getFailure } = postCrudSlice.actions;

  dispatch(getLoading({ id }));

  const handleSuccess = (data: Post) => {
    dispatch(getSuccess({ id, data }));
  };

  const handleError = (error: Error) => dispatch(getFailure({ id, error }));

  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

export const updatePost = (
  id: number,
  data: Partial<Post>
): AppThunk => async dispatch => {
  const { updateLoading, updateSuccess, updateFailure } = postCrudSlice.actions;

  dispatch(updateLoading({ id }));

  const handleSuccess = (data: Post) => {
    dispatch(updateSuccess({ id, data }));
  };

  const handleError = (error: Error) => dispatch(updateFailure({ id, error }));

  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      ...data
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

export const deletePost = (id: number): AppThunk => async dispatch => {
  const { deleteLoading, deleteSuccess, deleteFailure } = postCrudSlice.actions;

  dispatch(deleteLoading({ id }));

  const handleSuccess = (data: Post) => {
    dispatch(deleteSuccess({ id, data }));
  };

  const handleError = (error: Error) => dispatch(deleteFailure({ id, error }));

  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  })
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

export const fetchAllPost = (): AppThunk => async dispatch => {
  dispatch(postSlice.actions.getAllPostLoading());

  const handleSuccess = (data: Post[]) =>
    dispatch(
      postSlice.actions.getAllPostSuccess({ data: normalizeData(data) })
    );

  const handleError = (err: Error) =>
    dispatch(postSlice.actions.getAllPostFailure({ err }));

  await fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

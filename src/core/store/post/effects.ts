import { Post } from "./model";
import { AppThunk } from "../models";
import { postCrudSlice, postListCrudSlice } from "./index";
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
  const {
    getAllLoading,
    getAllFailure,
    getAllSuccess
  } = postListCrudSlice.actions;
  dispatch(getAllLoading());

  const handleSuccess = (data: Post[]) => dispatch(getAllSuccess({ data }));

  const handleError = (error: Error) => dispatch(getAllFailure({ error }));

  await fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

export const deleteAllPost = (id: number): AppThunk => async dispatch => {
  const {
    deleteAllLoading,
    deleteAllSuccess,
    deleteAllFailure
  } = postListCrudSlice.actions;

  dispatch(deleteAllLoading());

  const handleSuccess = (data: Post) => {
    dispatch(deleteAllSuccess());
  };

  const handleError = (error: Error) => dispatch(deleteAllFailure({ error }));

  await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: "DELETE"
  })
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};

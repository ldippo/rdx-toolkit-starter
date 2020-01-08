---
to: src/core/store/<%= entity %>/index.ts
---

import { createSlice } from "@reduxjs/toolkit";
import { <%= h.capitalize(entity) %>State, <%= h.capitalize(entity) %> } from "./models";
import { AppThunk } from "../models";

const initialState: <%= h.capitalize(entity) %>State = {};

export const <%= entity %>Slice = createSlice({
  initialState,
  name: "<%= entity %>s",
  reducers: {
    get<%= h.capitalize(entity) %>Success(state, action) {
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
    get<%= h.capitalize(entity) %>Failure(state, action) {
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
    get<%= h.capitalize(entity) %>Loading(state, action) {
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

export const fetch<%= h.capitalize(entity) %> = (id: number): AppThunk => async dispatch => {
  dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Loading({ id }));

  const handleSuccess = (data: <%= h.capitalize(entity) %>) =>
    dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Success({ id, data }));

  const handleError = (err: Error) =>
    dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Failure({ id, err }));

  await fetch(`https://jsonplaceholder.typicode.com/<%= entity %>s/${id}`)
    .then(p => p.json())
    .then(handleSuccess)
    .catch(handleError);
};


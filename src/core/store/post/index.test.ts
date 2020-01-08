import { postSlice } from "./index";
import { store } from "../index";
import { mockPost } from "./model";

const id = 1;

test("initially empty", () => {
  expect(store.getState().posts[id]).toBe(undefined);
});

test("is loading", () => {
  store.dispatch(postSlice.actions.getPostLoading({ id }));
  expect(store.getState().posts[1].loading).toBe(true);
});

test("handles success", () => {
  const post = mockPost();
  store.dispatch(postSlice.actions.getPostSuccess({ id, data: post }));
  expect(store.getState().posts[1].data).toBe(post);
});

test("handles failure", () => {
  const error = new Error("Boom");
  store.dispatch(postSlice.actions.getPostFailure({ id, err: error }));
  expect(store.getState().posts[1].err).toBe(error);
});

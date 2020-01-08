---
to: src/core/store/<%= entity %>/index.test.ts
---

import { <%= entity %>Slice } from "./index";
import { store } from "../index";
import { mock<%= h.capitalize(entity) %> } from "./mocks";

const id = 1;

test("initially empty", () => {
  expect(store.getState().<%= entity %>s[id]).toBe(undefined);
});

test("is loading", () => {
  store.dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Loading({ id }));
  expect(store.getState().<%= entity %>s[1].loading).toBe(true);
});

test("handles success", () => {
  const <%= entity %> = mock<%= h.capitalize(entity) %>();
  store.dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Success({ id, data: <%= entity %> }));
  expect(store.getState().<%= entity %>s[1].data).toBe(<%= entity %>);
});

test("handles failure", () => {
  const error = new Error("Boom");
  store.dispatch(<%= entity %>Slice.actions.get<%= h.capitalize(entity) %>Failure({ id, err: error }));
  expect(store.getState().<%= entity %>s[1].err).toBe(error);
});

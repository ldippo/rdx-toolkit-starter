---
to: src/core/store/<%= entity %>/mocks.ts
---
import faker from "faker";
import { <%= h.capitalize(entity) %> } from "./models";

export const mock<%= h.capitalize(entity) %> = (id?: number): <%= h.capitalize(entity) %> => ({
  id: id || faker.random.number()
});

---
to: src/core/store/<%= entity %>/models.ts
---
import { NormalizedData } from "../models";

export interface <%= h.capitalize(entity) %> {
  id: number;
}

export type Normalized<%= h.capitalize(entity) %> = NormalizedData<<%= h.capitalize(entity) %>>;

export interface <%= h.capitalize(entity) %>State {
  [key: string]: Normalized<%= h.capitalize(entity) %>;
}

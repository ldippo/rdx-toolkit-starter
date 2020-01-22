import { NormalizedDataEntity, NormalizedState } from "../models";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NormalizedPost = NormalizedDataEntity<Post>;

export type PostState = NormalizedState<Post>;

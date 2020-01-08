import { NormalizedData } from "../models";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NormalizedPost = NormalizedData<Post>;

export interface PostState {
  [key: string]: NormalizedPost;
}

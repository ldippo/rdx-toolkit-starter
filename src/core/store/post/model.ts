import { NormalizedData } from "../models";
import faker from "faker";

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

export const mockPost = (id?: number) => ({
  userId: faker.random.number(),
  id: id || faker.random.number(),
  title: faker.random.words(5),
  body: faker.random.words(30)
});

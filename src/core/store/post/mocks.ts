import faker from "faker";
import { Post } from "./model";

export const mockPost = (id?: number): Post => ({
  userId: faker.random.number(),
  id: id || faker.random.number(),
  title: faker.random.words(5),
  body: faker.random.words(30)
});

import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export interface NormalizedData<T> {
  data: T | null;
  id: string | number;
  err: Error | null;
  loading: boolean;
}

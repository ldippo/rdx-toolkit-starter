import { Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export interface NormalizedDataEntity<T> {
  data: T | null;
  id: string | number;
  error: Error | null;
  loading: boolean;
}

export interface NormalizedData<T> {
  [id: string]: NormalizedDataEntity<T>;
}

export interface NormalizedState<T> {
  data: NormalizedData<T>;
  error: Error | null;
  loading: boolean;
}

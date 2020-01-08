import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./core/store/post";

export function StateBlock() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  return (
    <>
      <button onClick={() => dispatch(fetchPost(1))} children="get a post" />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </>
  );
}

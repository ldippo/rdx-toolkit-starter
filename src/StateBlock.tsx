import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./core/store/post";

export function StateBlock() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [inputVal, setInputVal] = React.useState(1);
  return (
    <>
      <input
        type="number"
        value={inputVal}
        onChange={e => setInputVal(Number(e.currentTarget.value))}
      />
      <button
        onClick={() => dispatch(fetchPost(inputVal))}
        children={`get post with id ${inputVal}`}
      />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </>
  );
}

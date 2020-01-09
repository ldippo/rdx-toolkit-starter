import React from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "./core/store/post";
import { useTypedSelector } from "./core/store/util";

export function StateBlock() {
  const dispatch = useDispatch();
  const postState = useTypedSelector(state => state.posts);
  const [inputVal, setInputVal] = React.useState(1);

  const onInputChange = React.useCallback(
    e => setInputVal(Number(e.currentTarget.value)),
    []
  );

  const onButtonClick = React.useCallback(() => dispatch(fetchPost(inputVal)), [
    inputVal,
    dispatch
  ]);

  return (
    <>
      <input type="number" value={inputVal} onChange={onInputChange} />
      <button
        onClick={onButtonClick}
        children={`get post with id ${inputVal}`}
      />
      <pre>{JSON.stringify(postState, null, 4)}</pre>
    </>
  );
}

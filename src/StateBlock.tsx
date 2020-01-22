import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchPost,
  fetchAllPost,
  deletePost,
  updatePost
} from "./core/store/post";
import { useTypedSelector } from "./core/store/util";

export function StateBlock() {
  const dispatch = useDispatch();
  const postState = useTypedSelector(state => state);
  const [inputVal, setInputVal] = React.useState(1);
  const [inputVal2, setInputVal2] = React.useState("");
  const onInputChange = React.useCallback(
    e => setInputVal(Number(e.currentTarget.value)),
    []
  );
  const onInputChange2 = React.useCallback(
    e => setInputVal2(e.currentTarget.value),
    []
  );

  const onButtonClick = React.useCallback(() => dispatch(fetchPost(inputVal)), [
    inputVal,
    dispatch
  ]);

  const onButton2Click = () => dispatch(fetchAllPost());
  const onButton3Click = () => dispatch(deletePost(inputVal));
  const onButton4Click = () =>
    dispatch(updatePost(inputVal, { title: inputVal2 }));
  return (
    <>
      <input type="number" value={inputVal} onChange={onInputChange} />
      <input type="text" value={inputVal2} onChange={onInputChange2} />
      <button
        onClick={onButtonClick}
        children={`get post with id ${inputVal}`}
      />
      <button onClick={onButton2Click} children={`get all posts`} />
      <button onClick={onButton4Click} children={`update post`} />
      <button onClick={onButton3Click} children={`delete post`} />
      <pre>{JSON.stringify(postState, null, 4)}</pre>
    </>
  );
}

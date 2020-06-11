import React from "react";
import { useDispatch } from "react-redux";
import {
  fetchPost,
  fetchAllPost,
  deletePost,
  updatePost,
  deleteAllPost
} from "./core/store/post/effects";
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
    const onButton5Click = () =>
    dispatch(deleteAllPost());
  return (
    <>
      <input data-test-id="post id" type="number" value={inputVal} onChange={onInputChange} />
      <input data-test-id="update text" type="text" value={inputVal2} onChange={onInputChange2} />
      <button
      data-test-id="get"
        onClick={onButtonClick}
        children={`get post with id ${inputVal}`}
      />
      <button data-test-id="get all" onClick={onButton2Click} children={`get all posts`} />
      <button  data-test-id="update"  onClick={onButton4Click} children={`update post`} />
      <button  data-test-id="delete"  onClick={onButton3Click} children={`delete post`} />
      <button  data-test-id="delete all"  onClick={onButton5Click} children={`delete all posts`} />
      <pre>{JSON.stringify(postState, null, 4)}</pre>
    </>
  );
}

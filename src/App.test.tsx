import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders state block", () => {
  const { getByText } = render(<App />);
  const preElement = getByText(/posts/i);
  expect(preElement).toBeInTheDocument();
});

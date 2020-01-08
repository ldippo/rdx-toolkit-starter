import React from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import { store } from "./core/store";
import { StateBlock } from "./StateBlock";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StateBlock />
    </Provider>
  );
};

export default App;

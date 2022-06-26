import React from "react";
import { useDispatch, Provider } from "react-redux";
import configureStore from "./Redux/store";
import Todo from "./Screens/Todo";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

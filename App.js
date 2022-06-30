import React, { useState } from "react";
import Todo from "./Screens/Todo";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [ready, setReady] = useState(false);
  const [todo, setTodo] = useState([]);

  const loadTodos = () => {
    AsyncStorage.getItem("todo")
      .then((data) => {
        if (data !== null) {
          setTodo(JSON.parse(data));
        }
      })
      .catch((err) => console.log(err));
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={loadTodos}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return <Todo todo={todo} setTodo={setTodo} />;
}

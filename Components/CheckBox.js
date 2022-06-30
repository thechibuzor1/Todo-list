import React, { useEffect, useState } from "react";
import { Body, Icon, CheckBox, ListItem, Input, Button } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddtoDO({ todo, setTodo }) {
  const [active, setActive] = useState(false);
  

  const handleDelete = (indexNo) => {
    const newTodos = [...todo];
    newTodos.splice(indexNo, 1);

    AsyncStorage.setItem("todo", JSON.stringify(newTodos))
      .then(() => {
        setTodo(newTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAll = () => {
    const newTodos = [];

    AsyncStorage.setItem("todo", JSON.stringify(newTodos))
      .then(() => {
        setTodo(newTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TouchableOpacity onPress={() => handleDeleteAll()}>
        <Text style={styles.clearButton}>Clear All</Text>
      </TouchableOpacity>

      {todo.length === 0 ? (
        <View>
          <Text style={styles.noTodo}>You have no todos.</Text>
        </View>
      ) : (
        <>
          {todo.map((todos, index) => (
            <ListItem key={index}>
              <BouncyCheckbox
                iconStyle={{ borderColor: "black", borderRadius: 0 }}
                fillColor="green"
                isChecked={active}
                onPress={() => setActive((prev) => !prev)}
                text={todos}
                textStyle={styles.normal}
              />
              <Body></Body>
              <Button transparent onPress={() => handleDelete(index)}>
                <Icon name={"trash"} />
              </Button>
            </ListItem>
          ))}
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  crossed: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 15,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  normal: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 15,
    color: "black",
  },
  clearButton: {
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 10,
    color: "red",
  },
  noTodo: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 15,
    color: "#eeeeee",
    alignSelf:'center'
  }
});

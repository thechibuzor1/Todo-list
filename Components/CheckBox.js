import React, { useEffect, useState } from "react";
import { Body, Icon, CheckBox, ListItem, Input, Button } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import index from "uuid-random";

export default function AddtoDO() {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const storage = async () => {
      let items = await AsyncStorage.getItem("todo");
      if (items) {
        setData(JSON.parse(items));
        dispatch({
          type: "restore",
          payload: JSON.parse(items),
        });
      }
    };
    storage();
  }, []);

  const { todos } = useSelector((state) => state.todoReducer.todo);
  const reMake = todos.filter((todo) => todo !== "");
  const handleDelete = async (indexNo) => {
    dispatch({
      type: "delete",
      payload: indexNo,
    });
    setData(data.filter((todo, i) => i !== indexNo))
    console.log(data);
    await AsyncStorage.setItem("todo", JSON.stringify(data));
  };

  return (
    <>
      {reMake.map((todo, index) => (
        <ListItem key={index}>
          <BouncyCheckbox
            iconStyle={{ borderColor: "black", borderRadius: 0 }}
            fillColor="green"
            isChecked={active}
            onPress={() => setActive((prev) => !prev)}
            text={todo}
            textStyle={styles.normal}
          />
          <Body></Body>
          <Button transparent onPress={() => handleDelete(index)}>
            <Icon name={"trash"} />
          </Button>
        </ListItem>
      ))}
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
});

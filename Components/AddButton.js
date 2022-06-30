import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Container, Fab, Icon, Input } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

export default function AddButton({ todo, setTodo }) {
  const [visible, setVisible] = useState(false);
  const [newEntry, setNewEntry] = useState("");
 
  const modalContent = () => {
    const saveTodo = (newTodo) => {
      if (!newTodo.trim()) {
        alert("Empty Todo");
      } else {
        const newTodos = [...todo, newTodo];

        AsyncStorage.setItem("todo", JSON.stringify(newTodos))
          .then(() => {
            setTodo(newTodos);
            setVisible(false);
            setNewEntry("");
          })
          .catch((err) => console.log(err));
      }
    };
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.title}>Add To Todo</Text>
          <Input
            placeholder="What needs to be done?"
            onChangeText={(txt) => setNewEntry(txt)}
            value={newEntry}
          />

          <View></View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              saveTodo(newEntry);
            }}
          >
            <Text style={styles.buttonTitle}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        {modalContent()}
      </Modal>

      <Container>
        <Fab
          style={{ backgroundColor: "black" }}
          position="bottomRight"
          onPress={() => setVisible(true)}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalInnerContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 16,
    height: 250,
    borderWidth: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  text: {
    fontWeight: "500",
    fontSize: 15,
  },
  button: {
    backgroundColor: "black",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  Datecontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 50,
  },
  pickedDateContainer: {
    padding: 20,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 18,
    color: "black",
  },
  btnContainer: {
    padding: 30,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

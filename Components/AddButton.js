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

export default function AddButton() {
  const [visible, setVisible] = useState(false);
  const [submit, setSubmit] = useState("");
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    const storage = async () => {
      let items = await AsyncStorage.getItem("todo");
      if (items) {
        setData(JSON.parse(items));
      }
    };
    storage();
  }, []);

  useEffect(() => {
    setData([...data, todo]);
  }, [submit]);

  const modalContent = () => {
    const saveTodo = async () => {
      if (!submit.trim()) {
        alert("Empty Todo");
      } else {
        dispatch({
          type: "add",
          payload: submit,
        });
        try {

          setData(data.filter((data) => data !== ''))
          await AsyncStorage.setItem("todo", JSON.stringify(data));
          setVisible(false);
          setTodo("");
          setSubmit("");
        } catch (e) {
          console.log(e);
        }
      }
    };
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.title}>Add To Todo</Text>
          <Input
            placeholder="What needs to be done?"
            onChangeText={(txt) => setSubmit(txt)}
            value={submit}
          />

          <View></View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setTodo(submit);
              saveTodo();
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

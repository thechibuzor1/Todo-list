import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import AddButton from "../Components/AddButton";
import AddtoDO from "../Components/CheckBox";
import { Container, Content } from "native-base";
import moment from "moment";
import Calender from "../Components/Calender";

export default function Todo() {
  const date = moment();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          margin: 15,
          flexDirection: "row",
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          To do
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: "grey",
              marginTop: 40,
               
            }}
          >
            {date.format("dddd MMMM Do")}
          </Text>
          <Image
            source={require("../assests/calendar.png")}
            style={styles.img}
          />
        </View>
      </View>
      <Calender />
      <Container>
        <ScrollView>
          <AddtoDO />
        </ScrollView>

        <AddButton />
      </Container>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  img: {
    marginLeft: 5,
    marginTop: 40,
    height: 20,
    width: 20,
  },
});

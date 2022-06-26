import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from "react-native-slideable-calendar-strip";

export default function Calender() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date.toISOString());
  return (
    <View>
      <CalendarStrip
        selectedDate={selectedDate}
        onPressDate={(date) => {
          setSelectedDate(date);
        }}
        onPressGoToday={(today) => {
          setSelectedDate(today);
        }}
        markedDate={["2020-03-04", "2020-03-15", "2020-03-04", "2020-03-01"]}
        weekStartsOn={1}
      />
    </View>
  );
}

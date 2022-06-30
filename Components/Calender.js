import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarStrip from "react-native-slideable-calendar-strip";

export default function Calender() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date.toISOString());
  return (
    <View>
      <CalendarStrip
        scrollable
        selectedDate={selectedDate}
        markedDate={[selectedDate]}
        weekStartsOn={1}
      />
    </View>
  );
}

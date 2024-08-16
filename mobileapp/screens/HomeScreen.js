import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="Go to upload"
        onPress={() => navigation.navigate("Upload")}
      />
    </View>
  );
};

export default HomeScreen;

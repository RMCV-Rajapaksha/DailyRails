import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";

import { getLocation } from "./utils/locationService";
import { database, ref, set } from "./config/firebase";

const UploadData = () => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let interval;

    if (isTracking) {
      interval = setInterval(async () => {
        const coords = await getLocation();
        if (coords) {
          const timestamp = Date.now();
          setLocation(coords);
          const locationRef = ref(database, `${inputValue}`);
          set(locationRef, {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp,
          });
        }
      }, 10000); // Set interval to 10 seconds (10000 milliseconds)
    }

    return () => clearInterval(interval);
  }, [isTracking, inputValue]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Current Location:</Text>
      {location && (
        <Text key={location.timestamp}>
          Latitude: {location.latitude}
          {"\n"}
          Longitude: {location.longitude}
        </Text>
      )}

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
        }}
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
        placeholder="Enter text"
      />

      <Button
        title={isTracking ? "Stop Tracking" : "Start Tracking"}
        onPress={() => setIsTracking(!isTracking)}
      />
    </View>
  );
};

export default UploadData;

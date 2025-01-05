import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { getLocation } from "../../utils/locationService";
import { database, ref, set } from "../../config/firebase";

const UploadData = () => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let interval;

    if (isTracking) {
      interval = setInterval(async () => {
        try {
          setLoading(true);
          const coords = await getLocation();
          if (coords) {
            const timestamp = Date.now();
            setLocation(coords);
            const locationRef = ref(database, `trains/${inputValue}/locations/${timestamp}`);
            await set(locationRef, {
              latitude: coords.latitude,
              longitude: coords.longitude,
              timestamp,
            });
            setError(null);
          }
        } catch (err) {
          setError(err.message);
          setIsTracking(false);
        } finally {
          setLoading(false);
        }
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [isTracking, inputValue]);

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Train Location Tracker
        </Text>
        
        <TextInput
          className="w-full bg-gray-100 rounded-lg px-4 py-3 mb-4 text-gray-800"
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Enter Train ID"
          placeholderTextColor="#9CA3AF"
          editable={!isTracking}
        />

        {error && (
          <Text className="text-red-500 mb-4">{error}</Text>
        )}

        {loading && (
          <ActivityIndicator size="large" className="mb-4" />
        )}

        {location && (
          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <Text className="text-gray-600 mb-2">
              Current Location:
            </Text>
            <Text className="font-medium">
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text className="font-medium">
              Longitude: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setIsTracking(!isTracking)}
          className={`rounded-lg py-3 px-6 ${
            isTracking ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-medium">
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        {isTracking && (
          <Text className="text-green-600 text-center mt-4">
            Actively tracking train {inputValue}...
          </Text>
        )}
      </View>
    </View>
  );
};

export default UploadData;
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

  const updateLocation = async () => {
    try {
      setLoading(true);
      const coords = await getLocation(); // This will get fresh coordinates each time
      if (coords) {
        const timestamp = Date.now();
        const trainRef = ref(database, `/${inputValue}`);
        await set(trainRef, {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp,
        });
        setLocation(coords);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setIsTracking(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
  
    if (isTracking) {
      // Get location immediately when tracking starts
      updateLocation();
      
      // Then set up interval for regular updates
      interval = setInterval(updateLocation, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTracking, inputValue]);

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="bg-white rounded-xl shadow-sm p-6 mb-6 h-3/5">
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

        <View className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[120px]">
          <Text className="text-gray-600 mb-2">
            Current Location:
          </Text>
          {location ? (
            <>
              <Text className="font-medium">
                Latitude: {location.latitude.toFixed(15)}
              </Text>
              <Text className="font-medium">
                Longitude: {location.longitude.toFixed(15)}
              </Text>
            </>
          ) : (
            <Text className="text-gray-500">No location data available</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setIsTracking(!isTracking)}
          className={`rounded-lg py-3 px-6 ${isTracking ? 'bg-red-500' : 'bg-blue-500'}`}
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

        {loading && (
          <View className="mt-4 items-center">
            <ActivityIndicator size="large" color="#4B5563" />
          </View>
        )}
      </View>
    </View>
  );
};

export default UploadData;
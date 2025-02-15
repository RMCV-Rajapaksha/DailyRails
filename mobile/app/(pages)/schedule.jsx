import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { useRouter } from "expo-router";

const Schedule = () => {
  const [stations, setStations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [schedules, setSchedules] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${API_URL}/stations`);
      setStations(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const fetchSchedules = async (stationId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/stations/${stationId}/schedule`
      );
      setSchedules(response.data.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setSearchQuery(station.StationName);
    setShowDropdown(false);
    fetchSchedules(station.StationID);
  };

  const handleTrainSelect = (train) => {
    setSelectedTrain(selectedTrain?.trainId === train.trainId ? null : train);
  };

  const handleClearSelection = () => {
    setSelectedStation(null);
    setSearchQuery("");
    setSchedules(null);
    setSelectedTrain(null);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderTrainCard = (train, isDirectTrain = true) => (
    <TouchableOpacity
      key={train.trainId}
      onPress={() => handleTrainSelect(train)}
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
    >
      {/* Train Header */}
      <Text className="text-lg font-semibold text-[#111B47]">
        {train.trainName}
      </Text>

      {/* Train Times */}
      <View className="flex-row justify-between mt-2">
        <View>
          <Text className="text-gray-500">
            {isDirectTrain ? "Departure" : "At This Station"}
          </Text>
          <Text className="text-[#40A2B2]">
            {isDirectTrain
              ? formatTime(train.departureTime)
              : `Arr: ${formatTime(train.arrivalTime)}\nDep: ${formatTime(
                  train.departureTime
                )}`}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-gray-500">
            {isDirectTrain ? "Arrival At" : "Final Destination"}
          </Text>
          <Text className="font-medium">{train.endStation}</Text>
          {isDirectTrain && (
            <Text className="text-[#40A2B2]">
              {formatTime(train.arrivalTime)}
            </Text>
          )}
        </View>
      </View>

      {/* Route Info */}
      <View className="mt-2 pt-2 border-t border-gray-100">
        <Text className="text-gray-500 text-sm">
          {train.startStation} → {train.endStation}
        </Text>
      </View>

      {/* Stopping Points - Show for both direct and stopping trains */}
      {selectedTrain?.trainId === train.trainId && (
        <View className="mt-4 border-t border-gray-200 pt-4">
          <Text className="text-md font-semibold text-[#111B47] mb-2">
            {isDirectTrain ? "Stops Along The Way" : "Remaining Stops"}
          </Text>
          {(isDirectTrain ? train.stoppingPoints : train.remainingStops)?.map(
            (stop, index) => (
              <View
                key={index}
                className="flex-row justify-between py-2 border-b border-gray-100"
              >
                <Text className="text-gray-600">{stop.stationName}</Text>
                <View className="flex-row">
                  <Text className="text-[#40A2B2] mr-4">
                    {formatTime(stop.arrivalTime)}
                  </Text>
                  <Text className="text-[#40A2B2]">
                    {formatTime(stop.departureTime)}
                  </Text>
                </View>
              </View>
            )
          )}
          {(!isDirectTrain ? train.remainingStops : train.stoppingPoints)
            ?.length === 0 && (
            <Text className="text-gray-500 text-center py-2">
              No more stops
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Station Selection Header */}
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Ionicons name="chevron-back" size={24} color="#111B47" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#111B47] ml-2">
              Station Schedule
            </Text>
          </View>

          {/* Station Dropdown */}
          <View className="relative mb-6">
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
              <TouchableOpacity
                onPress={() => setShowDropdown(!showDropdown)}
                className="flex-1 flex-row items-center"
              >
                <Text
                  className={
                    searchQuery ? "text-black flex-1" : "text-gray-500 flex-1"
                  }
                >
                  {searchQuery || "Select a station"}
                </Text>
              </TouchableOpacity>

              {selectedStation && (
                <TouchableOpacity
                  onPress={handleClearSelection}
                  className="px-2"
                >
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() =>
                  selectedStation && fetchSchedules(selectedStation.StationID)
                }
                className="px-2"
              >
                <Ionicons name="refresh" size={20} color="#40A2B2" />
              </TouchableOpacity>
            </View>

            {/* Station Search Dropdown */}
            {showDropdown && (
              <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-60 shadow-lg">
                <TextInput
                  className="border-b border-gray-200 p-3"
                  placeholder="Search stations..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <ScrollView>
                  {stations
                    .filter((station) =>
                      station.StationName.toLowerCase().includes(
                        searchQuery.toLowerCase()
                      )
                    )
                    .map((station) => (
                      <TouchableOpacity
                        key={station.StationID}
                        className="p-3 border-b border-gray-100 active:bg-gray-100"
                        onPress={() => handleStationSelect(station)}
                      >
                        <Text className="text-[#111B47]">
                          {station.StationName}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Schedule Display */}
          {selectedStation && (
            <View>
              <Text className="text-lg font-semibold text-[#111B47] mb-4">
                Train Schedules for {selectedStation.StationName}
              </Text>

              {loading ? (
                <ActivityIndicator size="large" color="#40A2B2" />
              ) : schedules ? (
                <View>
                  {/* Direct Trains */}
                  {schedules.directTrains?.length > 0 && (
                    <View className="mb-6">
                      <Text className="text-md font-semibold text-[#111B47] mb-2">
                        Departing Trains
                      </Text>
                      {schedules.directTrains.map((train) =>
                        renderTrainCard(train, true)
                      )}
                    </View>
                  )}

                  {/* Stopping Trains */}
                  {schedules.stoppingTrains?.length > 0 && (
                    <View>
                      <Text className="text-md font-semibold text-[#111B47] mb-2">
                        Passing Trains
                      </Text>
                      {schedules.stoppingTrains.map((train) =>
                        renderTrainCard(train, false)
                      )}
                    </View>
                  )}

                  {!schedules.directTrains?.length &&
                    !schedules.stoppingTrains?.length && (
                      <Text className="text-gray-500 text-center py-4">
                        No schedules found for this station
                      </Text>
                    )}
                </View>
              ) : (
                <Text className="text-gray-500 text-center py-4">
                  Select a station to view schedules
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;

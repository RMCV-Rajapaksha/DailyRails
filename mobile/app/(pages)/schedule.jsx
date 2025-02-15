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

const Schedule = () => {
  const [stations, setStations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      console.log("Fetching stations from:", `${API_URL}stations`);
      const response = await axios.get(`${API_URL}/stations`);
      setStations(response.data.stations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const fetchSchedules = async (stationId) => {
    setLoading(true);
    try {
      console.log("Fetching schedules for station:", stationId);
      const response = await axios.get(
        `${API_URL}/stations/${stationId}/schedule`
      );
      console.log("Schedule response:", response.data);
      setSchedules(response.data.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedStation(null);
    setSearchQuery("");
    setSchedules([]);
  };

  const handleSearchSchedule = () => {
    if (selectedStation) {
      fetchSchedules(selectedStation.StationID);
    }
  };

  const filteredStations = stations.filter((station) =>
    station.StationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setSearchQuery(station.StationName);
    setShowDropdown(false);
    fetchSchedules(station.StationID);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold text-[#111B47] mb-4">
            Select Station
          </Text>

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

            {showDropdown && (
              <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 z-10 max-h-60 shadow-lg">
                <TextInput
                  className="border-b border-gray-200 p-3"
                  placeholder="Search stations..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <ScrollView>
                  {filteredStations.map((station) => (
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

          {selectedStation && (
            <View>
              <Text className="text-lg font-semibold text-[#111B47] mb-4">
                Train Schedules for {selectedStation.StationName}
              </Text>

              {loading ? (
                <ActivityIndicator size="large" color="#40A2B2" />
              ) : schedules ? (
                <View>
                  {/* Direct Trains Section */}
                  {schedules.directTrains &&
                    schedules.directTrains.length > 0 && (
                      <View className="mb-4">
                        <Text className="text-md font-semibold text-[#111B47] mb-2">
                          Direct Trains
                        </Text>
                        {schedules.directTrains.map((train) => (
                          <View
                            key={train.trainId}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
                          >
                            <Text className="text-lg font-semibold text-[#111B47]">
                              {train.trainName}
                            </Text>
                            <View className="flex-row justify-between mt-2">
                              <View>
                                <Text className="text-gray-500">From</Text>
                                <Text className="font-medium">
                                  {train.startStation}
                                </Text>
                                <Text className="text-[#40A2B2]">
                                  {formatTime(train.departureTime)}
                                </Text>
                              </View>
                              <View className="items-end">
                                <Text className="text-gray-500">To</Text>
                                <Text className="font-medium">
                                  {train.endStation}
                                </Text>
                                <Text className="text-[#40A2B2]">
                                  {formatTime(train.arrivalTime)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}

                  {/* Stopping Trains Section */}
                  {schedules.stoppingTrains &&
                    schedules.stoppingTrains.length > 0 && (
                      <View>
                        <Text className="text-md font-semibold text-[#111B47] mb-2">
                          Stopping Trains
                        </Text>
                        {schedules.stoppingTrains.map((train) => (
                          <View
                            key={train.trainId}
                            className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
                          >
                            <Text className="text-lg font-semibold text-[#111B47]">
                              {train.trainName}
                            </Text>
                            <View className="flex-row justify-between mt-2">
                              <View>
                                <Text className="text-gray-500">Arrival</Text>
                                <Text className="text-[#40A2B2]">
                                  {formatTime(train.arrivalTime)}
                                </Text>
                              </View>
                              <View className="items-end">
                                <Text className="text-gray-500">Departure</Text>
                                <Text className="text-[#40A2B2]">
                                  {formatTime(train.departureTime)}
                                </Text>
                              </View>
                            </View>
                            <View className="mt-2 pt-2 border-t border-gray-100">
                              <Text className="text-gray-500 text-sm">
                                {train.startStation} → {train.endStation}
                              </Text>
                            </View>
                          </View>
                        ))}
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

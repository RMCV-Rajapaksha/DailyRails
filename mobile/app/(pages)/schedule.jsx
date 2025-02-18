import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { useRouter } from "expo-router";

const Schedule = () => {
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
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

  const fetchSchedules = async () => {
    if (!fromStation || !toStation) return;

    setLoading(true);
    try {
      console.log("Searching trains between:", {
        from: fromStation.StationName,
        fromId: fromStation.StationID,
        to: toStation.StationName,
        toId: toStation.StationID,
      });

      const response = await axios.post(`${API_URL}/trains/search`, {
        Location_1: fromStation.StationID,
        Location_2: toStation.StationID,
      });

      if (response.data.success && response.data.data.length > 0) {
        setSchedules(response.data.data);
      } else {
        console.log("No trains found between stations:", {
          from: fromStation.StationName,
          to: toStation.StationName,
        });
        setSchedules([]);
      }
    } catch (error) {
      console.error("Error fetching schedules:", {
        error: error?.response?.data || error.message,
        from: fromStation.StationName,
        to: toStation.StationName,
      });
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFromSearch = () => {
    setFromSearch("");
    setFromStation(null);
    setSchedules(null);
    setSelectedTrain(null);
  };

  const clearToSearch = () => {
    setToSearch("");
    setToStation(null);
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

  const renderStationSearch = (
    value,
    setValue,
    showDropdown,
    setShowDropdown,
    searchValue,
    setSearchValue,
    clearSearch,
    placeholder
  ) => (
    <View className="relative mb-4">
      <View className="flex-row items-center bg-white rounded-lg shadow-lg p-2">
        <TextInput
          className="flex-1 px-4 py-2 text-gray-800"
          placeholder={placeholder}
          value={searchValue}
          onChangeText={setSearchValue}
          onFocus={() => {
            fetchStations();
            setShowDropdown(true);
          }}
        />
        {searchValue ? (
          <TouchableOpacity className="ml-2 p-2" onPress={clearSearch}>
            <Ionicons name="close-circle" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>

      {showDropdown && (
        <View className="mt-2 bg-white rounded-lg shadow-lg max-h-60">
          <FlatList
            data={stations.filter((station) =>
              station.StationName.toLowerCase().includes(
                searchValue.toLowerCase()
              )
            )}
            keyExtractor={(item) => item.StationID}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-200"
                onPress={() => {
                  setValue(item);
                  setSearchValue(item.StationName);
                  setShowDropdown(false);
                }}
              >
                <Text className="text-gray-800 font-medium">
                  {item.StationName}
                </Text>
                <Text className="text-gray-600 text-sm">
                  ID: {item.StationID}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );

  const renderTrainCard = (train) => (
    <TouchableOpacity
      key={train.TrainID}
      onPress={() =>
        setSelectedTrain(
          selectedTrain?.TrainID === train.TrainID ? null : train
        )
      }
      className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm"
    >
      <Text className="text-lg font-semibold text-[#111B47]">{train.Name}</Text>

      <View className="flex-row justify-between mt-2">
        <View>
          <Text className="text-gray-500">Departure</Text>
          <Text className="text-[#40A2B2]">
            {formatTime(train.departureTime)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-gray-500">Arrival</Text>
          <Text className="text-[#40A2B2]">
            {formatTime(train.arrivalTime)}
          </Text>
        </View>
      </View>

      {selectedTrain?.TrainID === train.TrainID && train.stops && (
        <View className="mt-4 border-t border-gray-200 pt-4">
          <Text className="text-md font-semibold text-[#111B47] mb-2">
            Stops Along The Way
          </Text>
          {train.stops.map((stop, index) => (
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
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-1">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="chevron-back" size={24} color="#111B47" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#111B47] ml-2">
            Search Trains
          </Text>
        </View>

        {renderStationSearch(
          fromStation,
          setFromStation,
          showFromDropdown,
          setShowFromDropdown,
          fromSearch,
          setFromSearch,
          clearFromSearch,
          "From Station"
        )}

        {renderStationSearch(
          toStation,
          setToStation,
          showToDropdown,
          setShowToDropdown,
          toSearch,
          setToSearch,
          clearToSearch,
          "To Station"
        )}

        <TouchableOpacity
          onPress={fetchSchedules}
          disabled={!fromStation || !toStation}
          className={`rounded-lg px-6 py-3 mb-6 ${
            !fromStation || !toStation ? "bg-gray-300" : "bg-[#40A2B2]"
          }`}
        >
          <Text className="text-center font-medium text-white">
            Search Trains
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#40A2B2" />
        ) : schedules ? (
          schedules.length > 0 ? (
            <FlatList
              data={schedules}
              keyExtractor={(item) => item.TrainID}
              ListHeaderComponent={() => (
                <Text className="text-lg font-semibold text-[#111B47] mb-4">
                  Available Trains
                </Text>
              )}
              renderItem={({ item }) => renderTrainCard(item)}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <View className="flex-1 justify-center items-center p-4">
              <Ionicons name="train-outline" size={64} color="#9CA3AF" />
              <Text className="text-xl font-semibold text-[#111B47] mt-4">
                No trains available from
              </Text>
              <Text className="text-lg font-medium text-[#40A2B2] text-center mt-1">
                {fromStation.StationName} → {toStation.StationName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  clearFromSearch();
                  clearToSearch();
                }}
                className="mt-6 bg-[#40A2B2] px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-medium">
                  Try Different Stations
                </Text>
              </TouchableOpacity>
            </View>
          )
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Schedule;

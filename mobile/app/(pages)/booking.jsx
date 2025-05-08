import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HeroSection from "../../components/HeroSection";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { API_URL } from "@env";

const Booking = () => {
  const router = useRouter();

  // Station dropdown states
  const [startStationOpen, setStartStationOpen] = useState(false);
  const [endStationOpen, setEndStationOpen] = useState(false);
  const [startStation, setStartStation] = useState(null);
  const [endStation, setEndStation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);

  // Date selection state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Passenger count
  const [passengers, setPassengers] = useState(1);

  // Available trains state
  const [trains, setTrains] = useState([]);
  const [loadingTrains, setLoadingTrains] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Fetch stations on component mount
  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${API_URL}/stations`);
      console.log("Station response:", response.data);

      let stationOptions = [];

      // Check all possible response formats
      if (
        response.data &&
        response.data.stations &&
        Array.isArray(response.data.stations)
      ) {
        stationOptions = response.data.stations.map((station) => ({
          label: station.StationName || station.Name || "Unknown Station",
          value: station.StationID || station.id || Math.random().toString(),
        }));
      } else if (response.data && Array.isArray(response.data)) {
        stationOptions = response.data.map((station) => ({
          label: station.StationName || station.Name || "Unknown Station",
          value: station.StationID || station.id || Math.random().toString(),
        }));
      } else {
        console.error(
          "Failed to fetch stations: Unexpected response format",
          response.data
        );
      }

      setStations(stationOptions);
    } catch (error) {
      console.error("Error fetching stations:", error);
    } finally {
      setLoadingStations(false);
    }
  };

const searchTrains = async () => {
  // Log the API URL for troubleshooting
  console.log("API_URL value:", API_URL);

  if (!startStation || !endStation) {
    alert("Please select both departure and destination stations");
    return;
  }

  setLoadingTrains(true);
  setSearchPerformed(true);

  try {
    // Safely find station names from IDs with null checks
    const startStationObj = Array.isArray(stations)
      ? stations.find((s) => s && s.value === startStation)
      : null;
    const endStationObj = Array.isArray(stations)
      ? stations.find((s) => s && s.value === endStation)
      : null;

    console.log("Station objects:", { startStationObj, endStationObj });

    const startStationName = startStationObj?.label || "";
    const endStationName = endStationObj?.label || "";

    if (!startStationName || !endStationName) {
      console.error("Could not find station names for selected IDs");
      alert("Error processing station information. Please try again.");
      setLoadingTrains(false);
      return;
    }

    const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    console.log("Searching trains with params:", {
      Location_1: startStationName,
      Location_2: endStationName,
      date: formattedDate,
    });

    // Make the API request
    console.log(`Sending request to: ${API_URL}/trains/search`);
    const response = await axios.post(`${API_URL}/trains/search`, {
      Location_1: startStationName,
      Location_2: endStationName,
      date: formattedDate,
    });

    console.log("Full API response:", JSON.stringify(response.data, null, 2));

    // Determine where the train data is in the response
    let trainData = [];

    if (Array.isArray(response.data)) {
      trainData = response.data;
      console.log("Train data found in response array");
    } else if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      trainData = response.data.data;
      console.log("Train data found in response.data.data");
    } else if (
      response.data &&
      response.data.trains &&
      Array.isArray(response.data.trains)
    ) {
      trainData = response.data.trains;
      console.log("Train data found in response.data.trains");
    } else {
      console.log("Could not find train data array in response");
      console.log("Response structure:", Object.keys(response.data || {}));
    }

    console.log("Raw train data count:", trainData.length);

    // Create transformed train objects that match your expected structure
    const transformedTrains = trainData.map((train) => {
      // Extract basic train properties with fallbacks
      const trainId =
        train.TrainID || train.train_id || train.id || String(Math.random());
      const trainName =
        train.Name || train.name || train.TrainName || "Express Train";

      // Extract time information
      const startTime =
        train.StartTime ||
        train.departure_time ||
        train.departureTime ||
        "08:00";
      const endTime =
        train.EndTime || train.arrival_time || train.arrivalTime || "10:00";

      // Handle price information
      let price = 0;
      if (train.price || train.Price) {
        price = parseFloat(train.price || train.Price);
      } else if (train.fare || train.Fare) {
        price = parseFloat(train.fare || train.Fare);
      }

      // Build a properly formatted train object
      const formattedTrain = {
        TrainID: trainId,
        Name: trainName,
        StartTime: startTime,
        EndTime: endTime,

        // Ensure journeys exists with at least one item
        journeys: Array.isArray(train.journeys)
          ? train.journeys
          : [
              {
                JourneyID:
                  train.JourneyID || train.journey_id || trainId + "-j1",
                Price: price || 100, // Default price if none found
              },
            ],
      };

      console.log("Transformed train:", trainId, trainName);
      return formattedTrain;
    });

    console.log(`Found and transformed ${transformedTrains.length} trains`);

    // Filter out any trains that might still have issues
    const validTrains = transformedTrains.filter(
      (train) =>
        train &&
        train.TrainID &&
        train.journeys &&
        Array.isArray(train.journeys) &&
        train.journeys.length > 0
    );

    console.log(`Final valid trains: ${validTrains.length}`);
    setTrains(validTrains);

    if (validTrains.length === 0) {
      console.log("No valid trains available for this route and date");
    }
  } catch (error) {
    console.error("Error searching trains:", error);
    console.error("Error details:", error.response?.data || error.message);
    console.log("Error status:", error.response?.status);
    console.log("Error headers:", error.response?.headers);
    setTrains([]);
  } finally {
    setLoadingTrains(false);
  }
};

  const resetForm = () => {
    setStartStation(null);
    setEndStation(null);
    setDate(new Date());
    setPassengers(1);
    setTrains([]);
    setSearchPerformed(false);
  };

const selectTrain = (train, selectedClass) => {
  if (
    !train ||
    !train.journeys ||
    !Array.isArray(train.journeys) ||
    train.journeys.length === 0
  ) {
    console.error("Invalid train data for selection");
    alert("Error with train data. Please try again.");
    return;
  }

  // Common parameters for both routes
  const commonParams = {
    trainId: train.TrainID || "",
    trainName: train.Name || "Train",
    journeyId: train.journeys[0].JourneyID || "",
    startStation: startStation || "",
    endStation: endStation || "",
    date: date.toISOString().split("T")[0],
    passengers: passengers || 1,
    class: selectedClass || 2,
  };

  // Route to different pages based on class selection
  if (selectedClass === 1) {
    // First class goes to booking-seats page
    router.push({
      pathname: "/booking-seats",
      params: commonParams,
    });
  } else {
    // 2nd and 3rd class go to seat-selection page
    router.push({
      pathname: "/seat-selection",
      params: commonParams,
    });
  }
};

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Handle dropdown behavior to ensure only one is open at a time
  useEffect(() => {
    if (startStationOpen) {
      setEndStationOpen(false);
    }
  }, [startStationOpen]);

  useEffect(() => {
    if (endStationOpen) {
      setStartStationOpen(false);
    }
  }, [endStationOpen]);

  // Helper function to safely get train price
  const getTrainPrice = (train, classMultiplier = 1) => {
    try {
      if (
        train &&
        train.journeys &&
        Array.isArray(train.journeys) &&
        train.journeys.length > 0
      ) {
        const price = train.journeys[0].Price || 0;
        return Math.round(price * classMultiplier);
      }
      return 0;
    } catch (error) {
      console.error("Error calculating price:", error);
      return 0;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Book Ticket</Text>
      </View>

      <ScrollView className="flex-1">
        <HeroSection />

        <View className="p-6 space-y-6">
          {/* Station Selection Section */}
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-gray-700">
              Select Route
            </Text>

            {/* From Station Dropdown */}
            <View className="z-30">
              <Text className="mb-1 text-gray-600">From</Text>
              {loadingStations ? (
                <ActivityIndicator color="#40A2B2" />
              ) : (
                <DropDownPicker
                  open={startStationOpen}
                  value={startStation}
                  items={Array.isArray(stations) ? stations : []}
                  setOpen={setStartStationOpen}
                  setValue={setStartStation}
                  placeholder="Select departure station"
                  style={{
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    minHeight: 50,
                  }}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{
                    borderColor: "#ccc",
                  }}
                />
              )}
            </View>

            {/* To Station Dropdown */}
            <View className="z-20">
              <Text className="mb-1 text-gray-600">To</Text>
              {loadingStations ? (
                <ActivityIndicator color="#40A2B2" />
              ) : (
                <DropDownPicker
                  open={endStationOpen}
                  value={endStation}
                  items={
                    Array.isArray(stations)
                      ? stations.filter(
                          (item) => item && item.value !== startStation
                        )
                      : []
                  }
                  setOpen={setEndStationOpen}
                  setValue={setEndStation}
                  placeholder="Select destination station"
                  style={{
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    minHeight: 50,
                  }}
                  listMode="SCROLLVIEW"
                  dropDownContainerStyle={{
                    borderColor: "#ccc",
                  }}
                />
              )}
            </View>

            {/* Date Selection */}
            <View className="z-10">
              <Text className="mb-1 text-gray-600">Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="w-full p-4 border border-gray-300 rounded-md flex-row justify-between items-center"
              >
                <Text>{date.toLocaleDateString()}</Text>
                <Ionicons name="calendar" size={20} color="gray" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Number of Passengers */}
            <View>
              <Text className="mb-1 text-gray-600">Number of Passengers</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <TouchableOpacity
                  onPress={() => setPassengers(Math.max(1, passengers - 1))}
                  className="p-4"
                  disabled={passengers <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={passengers <= 1 ? "#ccc" : "#40A2B2"}
                  />
                </TouchableOpacity>
                <Text className="flex-1 text-center text-lg">{passengers}</Text>
                <TouchableOpacity
                  onPress={() => setPassengers(Math.min(10, passengers + 1))}
                  className="p-4"
                  disabled={passengers >= 10}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={passengers >= 10 ? "#ccc" : "#40A2B2"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row mt-6 space-x-4">
            <TouchableOpacity
              onPress={searchTrains}
              className="flex-1 p-4 rounded-md bg-[#40A2B2]"
            >
              <Text className="font-medium text-center text-white">
                Search Trains
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={resetForm}
              className="flex-1 p-4 rounded-md bg-gray-200"
            >
              <Text className="font-medium text-center text-gray-700">
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          {/* Train Results Section */}
          {loadingTrains ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color="#40A2B2" />
              <Text className="mt-4 text-gray-600">
                Searching for trains...
              </Text>
            </View>
          ) : (
            searchPerformed && (
              <View className="mt-6">
                <Text className="text-lg font-semibold text-gray-700 mb-4">
                  {trains && trains.length > 0
                    ? `Available Trains (${trains.length})`
                    : "No trains available for selected route and date"}
                </Text>

                {Array.isArray(trains) &&
                  trains.map((train) => {
                    if (
                      !train ||
                      !train.TrainID ||
                      !train.journeys ||
                      !Array.isArray(train.journeys) ||
                      train.journeys.length === 0
                    ) {
                      return null;
                    }

                    return (
                      <View
                        key={train.TrainID}
                        className="mb-4 bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                      >
                        {/* Train Info Header */}
                        <View className="bg-[#40A2B2] p-3">
                          <Text className="text-white font-bold">
                            {train.Name || "Unnamed Train"}
                          </Text>
                        </View>

                        {/* Train Details */}
                        <View className="p-4">
                          {/* Journey Details */}
                          <View className="flex-row justify-between mb-3">
                            <View className="flex-1">
                              <Text className="text-xs text-gray-500">
                                Departure
                              </Text>
                              <Text className="font-semibold">
                                {train.StartTime || "N/A"}
                              </Text>
                            </View>
                            <View className="flex-1 items-center">
                              <Ionicons
                                name="arrow-forward"
                                size={16}
                                color="gray"
                              />
                              <Text className="text-xs text-gray-500">
                                Duration
                              </Text>
                            </View>
                            <View className="flex-1 items-end">
                              <Text className="text-xs text-gray-500">
                                Arrival
                              </Text>
                              <Text className="font-semibold">
                                {train.EndTime || "N/A"}
                              </Text>
                            </View>
                          </View>

                          {/* Class Selection Buttons */}
                          <Text className="text-sm text-gray-600 mb-2">
                            Select Class:
                          </Text>
                          <View className="flex-row space-x-2">
                            <TouchableOpacity
                              onPress={() => selectTrain(train, 1)}
                              className="flex-1 p-2 bg-blue-500 rounded items-center"
                            >
                              <Text className="text-white font-medium">
                                1st Class
                              </Text>
                              <Text className="text-white text-xs">
                                ₹{getTrainPrice(train, 1.5)}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => selectTrain(train, 2)}
                              className="flex-1 p-2 bg-green-500 rounded items-center"
                            >
                              <Text className="text-white font-medium">
                                2nd Class
                              </Text>
                              <Text className="text-white text-xs">
                                ₹{getTrainPrice(train, 1)}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => selectTrain(train, 3)}
                              className="flex-1 p-2 bg-yellow-500 rounded items-center"
                            >
                              <Text className="text-white font-medium">
                                3rd Class
                              </Text>
                              <Text className="text-white text-xs">
                                ₹{getTrainPrice(train, 0.75)}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Booking;

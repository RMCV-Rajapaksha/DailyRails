import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  Animated,
  FlatList,
  Dimensions,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { database, ref, onValue, off } from "../../config/firebase";
import { API_URL } from "@env";

const StyledMapView = styled(MapView);
const screenHeight = Dimensions.get("window").height;

const androidMapStyle = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }],
  },
];

const Map = () => {
  const [location, setLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [searchTrain, setSearchTrain] = useState("");
  const [trainLocation, setTrainLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const [trains, setTrains] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [cardHeight] = useState(new Animated.Value(0));

  const initialRegion = {
    latitude: 6.0794,
    longitude: 80.192,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        cardHeight.setValue(-gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 50) {
        Animated.spring(cardHeight, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(cardHeight, {
          toValue: selectedTrain ? 300 : 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const clearSearch = () => {
    setSearchTrain("");
    setSelectedTrain(null);
    stopTrackingTrain();
    setShowDropdown(false);
  };

  const fetchTrains = async () => {
    try {
      const response = await fetch(`${API_URL}/trains`);
      const data = await response.json();
      if (data.success) {
        setTrains(data.data);
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      Alert.alert("Error", "Failed to fetch train list");
    }
  };

  const startTrackingTrain = (trainId) => {
    if (!trainId.trim()) {
      Alert.alert("Error", "Please enter a valid train ID");
      return;
    }

    try {
      const trainRef = ref(database, `/trains/${trainId}/location`);
      setIsTracking(true);

      const unsubscribeFromTrain = onValue(
        trainRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data && data.latitude && data.longitude) {
            const newTrainLocation = {
              latitude: parseFloat(data.latitude),
              longitude: parseFloat(data.longitude),
              timestamp: data.timestamp || Date.now(),
            };
            setTrainLocation(newTrainLocation);

            if (mapRef) {
              mapRef.animateToRegion(
                {
                  latitude: newTrainLocation.latitude,
                  longitude: newTrainLocation.longitude,
                  latitudeDelta: 0.0122,
                  longitudeDelta: 0.0121,
                },
                1000
              );
            }
          } else {
            // Handle no location data case
            setTrainLocation(null);
            setIsTracking(false);
            // Show status in the card instead of an alert
            setSelectedTrain((prev) => ({
              ...prev,
              status: "offline",
            }));
          }
        },
        (error) => {
          console.error("Firebase error:", error);
          setIsTracking(false);
          setSelectedTrain((prev) => ({
            ...prev,
            status: "error",
          }));
        }
      );

      setUnsubscribe(() => unsubscribeFromTrain);
    } catch (error) {
      console.error("Error starting train tracking:", error);
      setIsTracking(false);
      setSelectedTrain((prev) => ({
        ...prev,
        status: "error",
      }));
    }
  };

  const stopTrackingTrain = () => {
    if (unsubscribe) {
      unsubscribe();
      setUnsubscribe(null);
      setIsTracking(false);
      setTrainLocation(null);
      setSelectedTrain(null);
      Animated.spring(cardHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to see nearby train tracks."
        );
        return;
      }
      getCurrentLocation();
    } catch (error) {
      Alert.alert("Error", "Failed to get location permissions");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setLocation(newRegion);
      mapRef?.animateToRegion(newRegion, 1000);
    } catch (error) {
      Alert.alert(
        "Location Error",
        "Unable to fetch your location. Please check your settings."
      );
    }
  };

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <View className="flex-1">
      <View className="absolute top-10 left-4 right-4 z-10">
        <View className="flex-row items-center bg-white rounded-lg shadow-lg p-2">
          <TextInput
            className="flex-1 px-4 py-2 text-[#111B47]"
            placeholder="Search trains..."
            placeholderTextColor="#9CA3AF"
            value={searchTrain}
            onChangeText={setSearchTrain}
            onFocus={() => {
              fetchTrains();
              setShowDropdown(true);
            }}
          />
          {searchTrain ? (
            <TouchableOpacity className="ml-2 p-2" onPress={clearSearch}>
              <Ionicons name="close-circle" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
          {isTracking ? (
            <TouchableOpacity
              className="ml-2 bg-red-500 p-2 rounded-lg"
              onPress={stopTrackingTrain}
            >
              <Ionicons name="stop-circle" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="ml-2 bg-[#40A2B2] p-2 rounded-lg"
              onPress={() => setShowDropdown(true)}
            >
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {showDropdown && (
          <View className="mt-2 bg-white rounded-lg shadow-lg max-h-60">
            <FlatList
              data={trains.filter(
                (train) =>
                  train.Name.toLowerCase().includes(
                    searchTrain.toLowerCase()
                  ) ||
                  train.TrainID.toLowerCase().includes(
                    searchTrain.toLowerCase()
                  )
              )}
              keyExtractor={(item) => item.TrainID}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    setSelectedTrain(item);
                    setSearchTrain(item.Name);
                    setShowDropdown(false);
                    startTrackingTrain(item.TrainID);
                    Animated.spring(cardHeight, {
                      toValue: 300,
                      useNativeDriver: false,
                    }).start();
                  }}
                >
                  <Text className="text-[#111B47] font-medium">
                    {item.Name}
                  </Text>
                  <Text className="text-[#40A2B2] text-sm">
                    ID: {item.TrainID}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <StyledMapView
        ref={(ref) => setMapRef(ref)}
        className="flex-1"
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        rotateEnabled
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        customMapStyle={Platform.OS === "android" ? androidMapStyle : null}
      >
        {trainLocation && (
          <Marker
            coordinate={{
              latitude: trainLocation.latitude,
              longitude: trainLocation.longitude,
            }}
            title={selectedTrain?.Name || `Train ${searchTrain}`}
            description={`Last updated: ${new Date(
              trainLocation.timestamp
            ).toLocaleTimeString()}`}
          >
            <View className="bg-[#40A2B2] p-2 rounded-lg">
              <Ionicons name="train" size={24} color="white" />
            </View>
          </Marker>
        )}
      </StyledMapView>

      {selectedTrain && (
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: cardHeight,
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
          <Text className="text-xl font-bold mb-2 text-[#111B47]">
            {selectedTrain.Name}
          </Text>
          <Text className="text-[#40A2B2] mb-2">
            Train ID: {selectedTrain.TrainID}
          </Text>
          <Text className="text-gray-600 mb-2">
            <Text className="font-medium">Route: </Text>
            {selectedTrain.StartStations} → {selectedTrain.EndStations}
          </Text>
          <Text className="text-gray-600 mb-2">
            <Text className="font-medium">Time: </Text>
            {selectedTrain.StartTime} - {selectedTrain.EndTime}
          </Text>

          {selectedTrain.status === "offline" ? (
            <View className="flex-row items-center justify-center mt-2 p-3 bg-gray-50 rounded-lg">
              <Ionicons name="alert-circle" size={24} color="#40A2B2" />
              <Text className="text-[#111B47] ml-2">
                This train is currently not sharing location data.
              </Text>
            </View>
          ) : selectedTrain.status === "error" ? (
            <View className="flex-row items-center justify-center mt-2 p-3 bg-red-50 rounded-lg">
              <Ionicons name="warning" size={24} color="#EF4444" />
              <Text className="text-red-500 ml-2">
                Unable to track train location. Please try again later.
              </Text>
            </View>
          ) : trainLocation ? (
            <View className="flex-row items-center justify-center mt-2 p-3 bg-[#40A2B2]/10 rounded-lg">
              <Ionicons name="time-outline" size={24} color="#40A2B2" />
              <Text className="text-[#111B47] ml-2">
                Last Updated:{" "}
                <Text className="text-[#40A2B2]">
                  {new Date(trainLocation.timestamp).toLocaleTimeString()}
                </Text>
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center justify-center mt-2 p-3 bg-[#40A2B2]/10 rounded-lg">
              <ActivityIndicator color="#40A2B2" />
              <Text className="text-[#111B47] ml-2">
                Connecting to train location...
              </Text>
            </View>
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default Map;

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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#40A2B2" }],
  },
];

const Map = () => {
  const router = useRouter();
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
  const [isBookmarked, setIsBookmarked] = useState(false);

  const initialRegion = {
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        cardHeight.setValue(300 - gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 150) {
        Animated.spring(cardHeight, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => setSelectedTrain(null));
      } else {
        Animated.spring(cardHeight, {
          toValue: 300,
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

  const startTrackingTrain = async (trainId) => {
    if (!trainId.trim()) return;

    try {
      const trainRef = ref(database, `/trains/${trainId}/location`);
      setIsTracking(true);

      const unsubscribeFromTrain = onValue(trainRef, (snapshot) => {
        const data = snapshot.val();
        if (data?.latitude && data?.longitude) {
          const newLocation = {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            timestamp: data.timestamp || Date.now(),
          };
          setTrainLocation(newLocation);
          mapRef?.animateToRegion(
            {
              ...newLocation,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            },
            1000
          );
        } else {
          setTrainLocation(null);
          setSelectedTrain((prev) => ({ ...prev, status: "offline" }));
        }
      });

      setUnsubscribe(() => unsubscribeFromTrain);

      // Check bookmark status
      const bookmarks = await AsyncStorage.getItem("trainBookmarks");
      const bookmarksList = bookmarks ? JSON.parse(bookmarks) : [];
      setIsBookmarked(bookmarksList.some((b) => b.TrainID === trainId));
    } catch (error) {
      console.error("Error tracking train:", error);
      setSelectedTrain((prev) => ({ ...prev, status: "error" }));
    }
  };

  const stopTrackingTrain = () => {
    if (unsubscribe) {
      unsubscribe();
      setUnsubscribe(null);
      setIsTracking(false);
      setTrainLocation(null);
      setSelectedTrain(null);
      setIsBookmarked(false);
      Animated.spring(cardHeight, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem("trainBookmarks");
      let bookmarksList = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        bookmarksList = bookmarksList.filter(
          (b) => b.TrainID !== selectedTrain.TrainID
        );
      } else {
        bookmarksList.push(selectedTrain);
      }

      await AsyncStorage.setItem(
        "trainBookmarks",
        JSON.stringify(bookmarksList)
      );
      setIsBookmarked(!isBookmarked);

      Alert.alert(
        isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
        isBookmarked
          ? "Train removed from your bookmarks"
          : "Train added to your bookmarks"
      );
    } catch (error) {
      console.error("Bookmark error:", error);
      Alert.alert("Error", "Failed to update bookmarks");
    }
  };

  useEffect(() => {
    fetchTrains();
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status === "granted") {
        Location.getCurrentPositionAsync({}).then((location) => {
          const { latitude, longitude } = location.coords;
          mapRef?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          });
        });
      }
    });

    if (router.params?.trainId) {
      loadBookmarkedTrain(router.params.trainId);
    }

    return () => unsubscribe?.();
  }, [router.params?.trainId]);

  const loadBookmarkedTrain = async (trainId) => {
    try {
      const bookmarks = await AsyncStorage.getItem("trainBookmarks");
      if (bookmarks) {
        const train = JSON.parse(bookmarks).find((b) => b.TrainID === trainId);
        if (train) {
          setSelectedTrain(train);
          setSearchTrain(train.Name);
          startTrackingTrain(train.TrainID);
          Animated.spring(cardHeight, {
            toValue: 300,
            useNativeDriver: false,
          }).start();
        }
      }
    } catch (error) {
      console.error("Error loading bookmark:", error);
    }
  };

  return (
    <View className="flex-1">
      {/* Search Bar */}
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

        {/* Search Dropdown */}
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

      {/* Map View */}
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
            <View className="bg-[#40A2B2] p-2 rounded-lg shadow-lg">
              <Ionicons name="train" size={24} color="white" />
            </View>
          </Marker>
        )}
      </StyledMapView>

      {/* Train Info Card */}
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
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#111B47]">
              {selectedTrain.Name}
            </Text>
            <TouchableOpacity onPress={toggleBookmark} className="p-2">
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color="#40A2B2"
              />
            </TouchableOpacity>
          </View>

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

          {/* Status Messages */}
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

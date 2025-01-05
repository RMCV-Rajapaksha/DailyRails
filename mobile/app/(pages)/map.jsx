import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Alert, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const StyledMapView = styled(MapView);

// Previous map styles remain the same...
const androidMapStyle = [
  // ... (keeping the existing style)
];

const Map = () => {
  const [location, setLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [searchTrain, setSearchTrain] = useState('');
  const [trainLocation, setTrainLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null); // For handling the unsubscribe function

  const initialRegion = {
    latitude: 6.0794,
    longitude: 80.1920,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Function to start tracking a specific train
  const startTrackingTrain = (trainId) => {
    if (!trainId.trim()) {
      Alert.alert('Error', 'Please enter a valid train ID');
      return;
    }

    const db = getDatabase();
    const trainRef = ref(db, `/${trainId}`);
    setIsTracking(true);

    // Listen for real-time updates
    const unsubscribeFromTrain = onValue(trainRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newTrainLocation = {
          latitude: data.latitude,
          longitude: data.longitude,
          timestamp: data.timestamp,
        };
        setTrainLocation(newTrainLocation);

        // Animate map to new train location
        if (mapRef) {
          mapRef.animateToRegion({
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          }, 1000);
        }
      } else {
        Alert.alert('Error', 'Invalid Train Name');
        setIsTracking(false);
      }
    }, (error) => {
      console.error('Error tracking train:', error);
      Alert.alert('Error', 'Failed to track train location');
      setIsTracking(false);
    });

    // Set the unsubscribe function
    setUnsubscribe(() => unsubscribeFromTrain);
  };

  // Function to stop tracking the train
  const stopTrackingTrain = () => {
    if (unsubscribe) {
      unsubscribe(); // Unsubscribe from train updates
      setUnsubscribe(null);
      setIsTracking(false);
      setTrainLocation(null); // Optionally reset the train location
      Alert.alert('Tracking Stopped', 'You have stopped tracking the train.');
    }
  };

  // Request location permission and get current location
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Permission Denied",
          "Please enable location services to see nearby train tracks.",
          [{ text: "OK" }]
        );
        return;
      }

      getCurrentLocation();
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to get location permissions",
        [{ text: "OK" }]
      );
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      });
      
      const { latitude, longitude } = location.coords;
      
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setLocation(newRegion);
      mapRef?.animateToRegion(newRegion, Platform.OS === 'ios' ? 500 : 1000);
    } catch (error) {
      Alert.alert(
        "Location Error",
        "Unable to fetch your location. Please check your settings.",
        [{ text: "OK" }]
      );
      console.warn('Error getting location:', error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View className="flex-1">
      {/* Search Bar */}
      <View className="absolute top-10 left-4 right-4 z-10 flex-row items-center bg-white rounded-lg shadow-lg p-2">
        <TextInput
          className="flex-1 px-4 py-2 text-gray-800"
          placeholder="Enter Train ID to track"
          value={searchTrain}
          onChangeText={setSearchTrain}
        />
        <TouchableOpacity 
          className="ml-2 bg-blue-500 p-2 rounded-lg"
          onPress={() => startTrackingTrain(searchTrain)}
        >
          <Ionicons 
            name={isTracking ? "stop-circle" : "search"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <StyledMapView
        ref={(ref) => setMapRef(ref)}
        className="w-full h-full"
        initialRegion={initialRegion}
        showsUserLocation={false}  
        showsMyLocationButton={false}
        showsCompass={true}
        rotateEnabled={true}
        provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        customMapStyle={Platform.OS === 'android' ? androidMapStyle : null}
        mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
        showsTraffic={false}
        showsBuildings={true}
        showsPointsOfInterest={true}
        showsIndoors={true}
      >
        {/* Train Marker */}
        {trainLocation && (
          <Marker
            coordinate={{
              latitude: trainLocation.latitude,
              longitude: trainLocation.longitude,
            }}
            title={`Train ${searchTrain}`}
            description={`Last updated: ${new Date(trainLocation.timestamp).toLocaleTimeString()}`}
          >
            <View className="bg-blue-500 p-2 rounded-lg">
              <Ionicons name="train" size={24} color="white" />
            </View>
          </Marker>
        )}
      </StyledMapView>
      
      {/* Stop Tracking Button */}
      {isTracking && (
        <TouchableOpacity
          className="absolute right-4 bottom-20 bg-red-500 p-3 rounded-full"
          onPress={stopTrackingTrain}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="stop-circle" 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Map;

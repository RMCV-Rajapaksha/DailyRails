import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

// Style the MapView component with NativeWind
const StyledMapView = styled(MapView);

// Custom map style for Android only - hiding only roads
const androidMapStyle = [
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }
];

const Map = () => {
  const [location, setLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const initialRegion = {
    latitude: 6.0794,
    longitude: 80.1920,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

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
      <StyledMapView
        ref={(ref) => setMapRef(ref)}
        className="w-full h-full"
        initialRegion={initialRegion}
        showsUserLocation={true}
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
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
            description="You are here"
          />
        )}
      </StyledMapView>
      
      <TouchableOpacity
        className={`
          absolute right-4 bottom-10 
          bg-white p-3 rounded-full
          ${Platform.OS === 'ios' 
            ? 'shadow-lg shadow-black/25'
            : 'shadow-2xl shadow-black/50'
          }
        `}
        onPress={getCurrentLocation}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={Platform.OS === 'ios' ? 'location' : 'location-sharp'}
          size={24} 
          color={Platform.OS === 'ios' ? "#007AFF" : "#1a73e8"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Map;
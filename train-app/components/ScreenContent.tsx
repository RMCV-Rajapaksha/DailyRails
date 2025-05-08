import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { getLocation } from '../utils/locationService';
import { database, ref, set } from '../config/firebase';
import {
  startBackgroundUpdate,
  stopBackgroundUpdate,
  verifyBackgroundTask,
} from '../utils/backgroundTask';
import { Alert } from 'react-native';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

interface LocationData {
  latitude: number;
  longitude: number;
}

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);
  const STOP_PASSWORD = 'admin123';

  const updateLocation = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Updating location...');
      const coords = await getLocation();
      if (coords) {
        const timestamp = Date.now();
        const trainRef = ref(database, `/${inputValue}/`);
        await set(trainRef, {
          latitude: coords.latitude,
          longitude: coords.longitude,
          timestamp,
          isActive: true,
        });
        setLocation(coords);
        setLastUpdateTime(timestamp);
        console.log('Location updated successfully:', coords);
        setError(null);
      }
    } catch (err: unknown) {
      console.error('Error updating location:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      // Don't stop tracking on a single error
    } finally {
      setLoading(false);
    }
  }, [inputValue]);

  const startTracking = async () => {
    try {
      if (!inputValue) {
        setError('Please enter a Train ID');
        return;
      }

      // First update location immediately when starting tracking
      await updateLocation();

      await startBackgroundUpdate(inputValue);
      setIsTracking(true);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to start tracking');
      }
    }
  };

  const stopTracking = async () => {
    try {
      if (password !== STOP_PASSWORD) {
        Alert.alert('Invalid Password', 'Please enter the correct password to stop tracking');
        return;
      }

      // First, update the database to set isActive to false
      if (inputValue) {
        const trainRef = ref(database, `/${inputValue}/`);
        await set(trainRef, {
          // Keep existing data but update isActive status
          ...(location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
              }
            : {}),
          timestamp: Date.now(),
          isActive: false, // Set status to inactive
        });
        console.log('Train status set to inactive in database');
      }

      await stopBackgroundUpdate();
      setIsTracking(false);
      setShowPasswordInput(false);
      setPassword('');
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to stop tracking');
      }
    }
  };

  // Background task verification effect
  useEffect(() => {
    const checkBackgroundTask = async () => {
      if (isTracking) {
        const status = await verifyBackgroundTask();
        if (!status.isRunning) {
          await stopBackgroundUpdate();
          setIsTracking(false);
          setError('Background tracking stopped unexpectedly');
        }
      }
    };

    const intervalCheck = setInterval(checkBackgroundTask, 1000);
    return () => clearInterval(intervalCheck);
  }, [isTracking]);

  // Location update effect - improved implementation
  useEffect(() => {
    let locationInterval: NodeJS.Timeout;

    if (isTracking && inputValue) {
      // Update immediately when this effect runs
      updateLocation();

      // Then set up interval for regular updates
      locationInterval = setInterval(updateLocation, 15000); // 15 seconds for more frequent updates
      console.log('Location tracking interval started');
    }

    return () => {
      if (locationInterval) {
        clearInterval(locationInterval);
        console.log('Location tracking interval stopped');
      }
    };
  }, [isTracking, inputValue, updateLocation]);

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <View className="mb-6 h-3/5 rounded-xl bg-white p-6 shadow-sm">
        <Text className="mb-4 text-2xl font-bold text-gray-800">Train Location Tracker</Text>

        <TextInput
          className="mb-4 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-800"
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Enter Train ID"
          placeholderTextColor="#9CA3AF"
          editable={!isTracking}
        />

        {error && <Text className="mb-4 text-red-500">{error}</Text>}

        <View className="mb-4 min-h-[120px] rounded-lg bg-gray-100 p-4">
          <Text className="mb-2 text-gray-600">Current Location:</Text>
          {location ? (
            <>
              <Text className="font-medium">Latitude: {location.latitude.toFixed(15)}</Text>
              <Text className="font-medium">Longitude: {location.longitude.toFixed(15)}</Text>
              {lastUpdateTime && (
                <Text className="text-xs text-gray-500">
                  Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
                </Text>
              )}
            </>
          ) : (
            <Text className="text-gray-500">No location data available</Text>
          )}
        </View>

        {!isTracking ? (
          <TouchableOpacity onPress={startTracking} className="rounded-lg bg-blue-500 px-6 py-3">
            <Text className="text-center font-medium text-white">Start Tracking</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {showPasswordInput ? (
              <View>
                <TextInput
                  className="mb-4 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-800"
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter password to stop tracking"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
                <TouchableOpacity
                  onPress={stopTracking}
                  className="rounded-lg bg-red-500 px-6 py-3">
                  <Text className="text-center font-medium text-white">Confirm Stop Tracking</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowPasswordInput(true)}
                className="rounded-lg bg-red-500 px-6 py-3">
                <Text className="text-center font-medium text-white">Stop Tracking</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {isTracking && (
          <Text className="mt-4 text-center text-green-600">
            Actively tracking train {inputValue}...
          </Text>
        )}

        {loading && (
          <View className="mt-4 items-center">
            <ActivityIndicator size="large" color="#4B5563" />
          </View>
        )}
      </View>
      {children}
    </View>
  );
};

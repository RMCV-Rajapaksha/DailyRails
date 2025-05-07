import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database, ref, set } from '../config/firebase';

const LOCATION_TRACKING = 'background-location-task';
const TRAIN_ID_KEY = 'current_train_id';

// Save train ID to AsyncStorage
export const saveTrainId = async (trainId: string) => {
  try {
    await AsyncStorage.setItem(TRAIN_ID_KEY, trainId);
  } catch (error) {
    console.error('Error saving train ID:', error);
  }
};

// Define the background task
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error('Background task error:', error);
    return;
  }

  try {
    const trainId = await AsyncStorage.getItem(TRAIN_ID_KEY);
    if (!trainId) {
      console.error('No train ID found in storage');
      return;
    }

    if (data) {
      const { locations } = data as { locations: Location.LocationObject[] };
      const location = locations[0];

      if (location) {
        const timestamp = Date.now();
        const trainRef = ref(database, `/${trainId}/`);
        await set(trainRef, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp,
          isActive: true,
        });
      }
    }
  } catch (err) {
    console.error('Background task execution error:', err);
  }
});

export const startBackgroundUpdate = async (trainId: string) => {
  try {
    await saveTrainId(trainId);

    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

    if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
      throw new Error('Required location permissions not granted');
    }

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: 'Train Location Tracking Active',
        notificationBody: `Tracking Train ${trainId}`,
        notificationColor: '#4B5563',
      },
      mayShowUserSettingsDialog: true,
      activityType: Location.ActivityType.OtherNavigation,
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
    });

    // Set initial active status in Firebase
    const trainRef = ref(database, `/${trainId}/`);
    await set(trainRef, {
      isActive: true,
      startTime: Date.now(),
      lastUpdate: Date.now(),
    });
  } catch (err) {
    console.error('Error starting background updates:', err);
    throw err;
  }
};

export const verifyBackgroundTask = async () => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
  const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
  return { isRegistered, isRunning };
};

export const stopBackgroundUpdate = async () => {
  try {
    const trainId = await AsyncStorage.getItem(TRAIN_ID_KEY);
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING);
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
      if (trainId) {
        const trainRef = ref(database, `/${trainId}/`);
        await set(trainRef, { isActive: false });
      }
    }
    await AsyncStorage.removeItem(TRAIN_ID_KEY);
  } catch (err) {
    console.error('Error stopping background location updates:', err);
    throw err;
  }
};

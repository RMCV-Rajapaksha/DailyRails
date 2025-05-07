import * as Location from 'expo-location';

export const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 1000,
      distanceInterval: 0,
    });

    if (!coords) {
      throw new Error('Failed to get location coordinates');
    }

    return coords;
  } catch (error) {
    console.error('Error getting location:', error);
    throw error;
  }
};

import * as Location from "expo-location";

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return null;
  }

  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
    timeInterval: 10,
    distanceInterval: 1,
  });

  return coords;
};

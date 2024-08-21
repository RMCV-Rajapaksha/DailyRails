import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'


SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Black": require("../shared/assets/fonts/Roboto-Black.ttf"),
  });
  
  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: true}} />
    </Stack>
  )
}

export default RootLayout
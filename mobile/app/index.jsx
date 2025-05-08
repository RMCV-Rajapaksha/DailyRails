import { View, Text, TouchableOpacity, StatusBar, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import CustomSplash from "../components/CustomSplashScreen";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../constants";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in pressed");
  };

  if (isLoading) {
    return <CustomSplash />;
  }

  return (
    <View className="flex-1">
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Main container */}
      <View className="flex-1">
        {/* Image container */}
        <View className="h-4/6 relative">
          <Image
            source={images.auth_background}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"]}
            className="absolute w-full h-full"
          />
        </View>

        {/* Bottom container for text and white box */}
        <View className="absolute bottom-0 w-full h-[52%]">
          {/* Welcome text positioned just above white box */}
          <View className="px-7 mb-4">
            <Text className="text-4xl font-bold text-white shadow-lg mb-2">
              Welcome to
            </Text>
            <Text className="text-4xl font-bold text-white shadow-lg">
              DailyRails
            </Text>
          </View>

          {/* White box container */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 ">
            <View className="flex-1 justify-evenly py-6">
              {/* Buttons container */}
              <View className="space-y-6">
                {/* Sign In Button */}
                <TouchableOpacity
                  className="w-full bg-[#41A3B3] py-4 rounded-lg"
                  activeOpacity={0.8}
                  onPress={handleSignUp}
                >
                  <Text className="text-white text-center text-lg font-semibold">
                    Sign In
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                  className="w-full bg-[#41A3B3] py-4 rounded-lg"
                  activeOpacity={0.8}
                  onPress={handleSignUp}
                >
                  <Text className="text-white text-center text-lg font-semibold">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

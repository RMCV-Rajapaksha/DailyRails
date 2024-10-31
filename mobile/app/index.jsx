import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomSplash from '../components/CustomSplashScreen';
import CustomButton from '../components/CustomButton';
import AuthBackground from '../components/AuthBackground';
import images from '../constants/images';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  // Navigation handlers
  const handleSignIn = () => {
    router.push('/sign-in');  // Navigate to sign-in page
  };

  const handleSignUp = () => {
    router.push('/sign-up');  // Navigate to sign-up page
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic
    console.log('Google sign in pressed');
  };

  if (isLoading) {
    return (<><CustomSplash /></>);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex-1">
          {/* Status Bar */}
          <StatusBar barStyle="light-content" />

          {/* Background Image */}
          <Image
            source={images.auth_background}
            className="absolute w-full h-full"
            resizeMode="cover"
          />

          {/* Overlay Gradient */}
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
            className="absolute w-full h-full"
          />

          {/* Main Content Container */}
          <View className="flex-1 justify-between px-6 pt-10 pb-12">
            {/* Welcome Text Container */}
            <View className="mt-20">
              <Text className="text-4xl font-bold text-white shadow-lg">
                Welcome to
              </Text>
              <Text className="text-4xl font-bold text-white shadow-lg">
                DailyRails
              </Text>
            </View>

            {/* Buttons Container */}
            <View className="w-full space-y-4">
              {/* Sign In Button */}
              <TouchableOpacity
                className="w-full bg-[#41A3B3] py-4 rounded-lg"
                activeOpacity={0.8}
                onPress={handleSignIn}
              >
                <Text className="text-white text-center text-lg font-semibold">
                  Sign in
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

              {/* Or Divider */}
              <View className="flex-row items-center justify-center my-2">
                <Text className="text-white text-lg">or</Text>
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity
                className="w-full bg-white py-4 rounded-lg flex-row justify-center items-center"
                activeOpacity={0.8}
                onPress={handleGoogleSignIn}
              >
                <Text className="text-[#333] text-center text-lg font-semibold">
                  Continue with Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}
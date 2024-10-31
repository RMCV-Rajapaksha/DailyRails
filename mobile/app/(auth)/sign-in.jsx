// App.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants';
import { router } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Navigation handlers
  const handleSignIn = () => {
    // Add any validation logic here if needed
    if (email && password) {
      router.push('/home'); // Navigate to home screen
    } else {
      // Handle validation error
      alert('Please fill in all fields');
    }
  };

  const handleSignUp = () => {
    router.push('/sign-up'); // Navigate to sign up screen
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
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
      <View className="flex-1 px-6">
        {/* Welcome Text */}
        <View className="mt-20 mb-12">
          <Text className="text-4xl font-bold text-white shadow-lg">
            Welcome to
          </Text>
          <Text className="text-4xl font-bold text-white shadow-lg">
            DailyRails
          </Text>
        </View>

        {/* Sign In Form */}
        <View className="bg-white rounded-3xl p-6 shadow-lg">
          <Text className="text-2xl font-bold text-center mb-8 text-gray-800">
            Sign In
          </Text>

          {/* Username Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              USERNAME
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              placeholder="johndoe@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-600 mb-2">
              PASSWORD
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              placeholder="••••••••••"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            className="w-full bg-[#41A3B3] py-4 rounded-lg mb-4"
            activeOpacity={0.8}
            onPress={handleSignIn}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Sign in
            </Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">
              Don't have an account? 
            </Text>
            <TouchableOpacity className="ml-1" onPress={handleSignUp}>
              <Text className="text-[#41A3B3] font-semibold">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
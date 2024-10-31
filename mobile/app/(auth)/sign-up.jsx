// App.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { images } from '../../constants';

const SignUp = () => {  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <View className="mt-20 mb-8">
          <Text className="text-4xl font-bold text-white shadow-lg">
            Welcome to
          </Text>
          <Text className="text-4xl font-bold text-white shadow-lg">
            DailyRails
          </Text>
        </View>

        {/* Sign Up Form */}
        <View className="bg-white rounded-3xl p-6 shadow-lg">
          {/* First Name Input */}
          <View className="mb-4">
            <Text className="text-xs font-medium text-gray-600 mb-2">
              FIRST NAME
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Saykhani"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name Input */}
          <View className="mb-4">
            <Text className="text-xs font-medium text-gray-600 mb-2">
              LAST NAME
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Battle Royale"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-xs font-medium text-gray-600 mb-2">
              EMAIL
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800"
              placeholder="JOHNDOE@GMAIL.COM"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View className="mb-4">
            <Text className="text-xs font-medium text-gray-600 mb-2">
              PASSWORD
            </Text>
            <View className="relative">
              <TextInput
                className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800 pr-12"
                placeholder="••••••••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-3"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-xs font-medium text-gray-600 mb-2">
              PASSWORD
            </Text>
            <View className="relative">
              <TextInput
                className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-800 pr-12"
                placeholder="dayoneofuiuxdesign"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                className="absolute right-4 top-3"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={24} 
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            className="w-full bg-[#41A3B3] py-4 rounded-lg mb-4"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Next
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">
              You have an account? 
            </Text>
            <TouchableOpacity className="ml-1">
              <Text className="text-[#41A3B3] font-semibold">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUp;
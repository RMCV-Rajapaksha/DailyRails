import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants';
import { router } from 'expo-router';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (firstName && lastName && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      router.push('/home');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
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
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
              className="absolute w-full h-full"
            />
          </View>

          {/* Bottom container for text and white box */}
          <View className="absolute bottom-0 w-full h-[70%]">
            {/* Welcome text positioned just above white box */}
            <View className="px-7 mb-4">
              <Text className="text-4xl font-bold text-white shadow-lg">
                Sign Up
              </Text>
            </View>

            {/* White box container */}
            <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
              <View className="flex-1">
                {/* Form container */}
                <View className="space-y-4">
                  {/* First Name Input */}
                  <View className="space-y-2">
                    <Text className="text-gray-600 text-base uppercase tracking-wide">
                      First Name
                    </Text>
                    <TextInput
                      className="w-full border-b border-gray-300 pb-2 text-base"
                      placeholder="John"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>

                  {/* Last Name Input */}
                  <View className="space-y-2">
                    <Text className="text-gray-600 text-base uppercase tracking-wide">
                      Last Name
                    </Text>
                    <TextInput
                      className="w-full border-b border-gray-300 pb-2 text-base"
                      placeholder="Doe"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>

                  {/* Email Input */}
                  <View className="space-y-2">
                    <Text className="text-gray-600 text-base uppercase tracking-wide">
                      Email
                    </Text>
                    <TextInput
                      className="w-full border-b border-gray-300 pb-2 text-base"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>

                  {/* Password Input */}
                  <View className="space-y-2">
                    <Text className="text-gray-600 text-base uppercase tracking-wide">
                      Password
                    </Text>
                    <TextInput
                      className="w-full border-b border-gray-300 pb-2 text-base"
                      placeholder="********"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>

                  {/* Confirm Password Input */}
                  <View className="space-y-2">
                    <Text className="text-gray-600 text-base uppercase tracking-wide">
                      Confirm Password
                    </Text>
                    <TextInput
                      className="w-full border-b border-gray-300 pb-2 text-base"
                      placeholder="********"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                    />
                  </View>

                  {/* Next Button */}
                  <TouchableOpacity
                    className="w-full bg-[#41A3B3] py-4 rounded-lg mt-6"
                    activeOpacity={0.8}
                    onPress={handleSignUp}
                  >
                    <Text className="text-white text-center text-lg font-semibold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>

                  {/* Sign In Link */}
                  <View className="flex-row justify-center items-center pt-4">
                    <Text className="text-gray-600 text-base">
                      Already have an account? 
                    </Text>
                    <TouchableOpacity onPress={handleSignIn}>
                      <Text className="text-[#41A3B3] text-base font-semibold ml-1">
                        Sign in
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUp;
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../constants";
import { router } from "expo-router";
import AuthService from "../../services/AuthService";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    // Form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Password strength validation (simplified)
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    try {
      setIsLoading(true);

      // Prepare user data according to your API requirements
      const userData = {
        Name: `${firstName} ${lastName}`,
        Email: email,
        Password: password,
      };

      const response = await AuthService.register(userData);

      if (response.success) {
        Alert.alert("Success", "Your account has been created successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/sign-in"),
          },
        ]);
      } else {
        Alert.alert(
          "Registration Failed",
          response.message || "Something went wrong"
        );
      }
    } catch (error) {
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      Alert.alert("Error", errorMessage);
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"]}
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
                      editable={!isLoading}
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
                      editable={!isLoading}
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
                      editable={!isLoading}
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
                      editable={!isLoading}
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
                      editable={!isLoading}
                    />
                  </View>

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    className={`w-full bg-[#41A3B3] py-4 rounded-lg mt-6 ${
                      isLoading ? "opacity-70" : ""
                    }`}
                    activeOpacity={0.8}
                    onPress={handleSignUp}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text className="text-white text-center text-lg font-semibold">
                        Sign Up
                      </Text>
                    )}
                  </TouchableOpacity>

                  {/* Sign In Link */}
                  <View className="flex-row justify-center items-center pt-4">
                    <Text className="text-gray-600 text-base">
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={handleSignIn}
                      disabled={isLoading}
                    >
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

        {/* Overlay loading indicator for the entire screen if needed */}
        {isLoading && (
          <View className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <ActivityIndicator size="large" color="#41A3B3" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

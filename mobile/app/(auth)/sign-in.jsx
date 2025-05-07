import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../constants";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleSignIn = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);

      // Create credentials object
      const credentials = {
        Email: email,
        Password: password,
      };

      // Call login API
      const response = await AuthService.login(credentials);

      if (response.success) {
        // Store authentication data
        await signIn(response.user, response.token);

        // Special case for admin (adjust as needed)
        if (email.toLowerCase().includes("admin")) {
          router.replace("/admin-home");
        } else {
          router.replace("/home");
        }
      } else {
        Alert.alert("Error", response.message || "Login failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert("Error", error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/sign-up");
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
          <View className="absolute bottom-0 w-full h-[55%]">
            <View className="px-7 mb-4">
              <Text className="text-4xl font-bold text-white shadow-lg">
                Sign In
              </Text>
            </View>

            {/* White box container */}
            <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
              <View className="flex-1">
                {/* Form container - Adjusted space-y-8 for more spacing */}
                <View className="space-y-8">
                  {/* Input Fields Group - Added separate spacing for inputs */}
                  <View className="mb-6">
                    <CustomInput
                      label="EMAIL"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      containerClassName="mb-6"
                      autoCapitalize="none"
                      editable={!isLoading}
                    />
                    <CustomInput
                      label="PASSWORD"
                      placeholder="********"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      containerClassName="mb-6"
                      editable={!isLoading}
                    />
                  </View>

                  {/* Button with adjusted top margin */}
                  <CustomButton
                    title={isLoading ? "Signing in..." : "Sign in"}
                    onPress={handleSignIn}
                    variant="primary"
                    className="mt-4"
                    disabled={isLoading}
                  />

                  <View className="flex-row justify-center items-center">
                    <Text className="text-gray-600 text-base">
                      Don't have an account?
                    </Text>
                    <CustomButton
                      title="Sign up"
                      onPress={handleSignUp}
                      variant="link"
                      className="ml-1"
                      disabled={isLoading}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Loading overlay */}
        {isLoading && (
          <View className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <ActivityIndicator size="large" color="#41A3B3" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

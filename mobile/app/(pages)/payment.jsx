import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const PaymentWebView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { paymentUrl } = params;

  const [loading, setLoading] = useState(true);

  // Handle navigation state changes - simplified to just monitor
  const handleNavigationStateChange = (navState) => {
    console.log("Current URL:", navState.url);

    // Optional: Detect success or cancel URLs without API calls
    if (navState.url.includes("/booking/success")) {
      alert("Payment completed successfully! Your booking has been confirmed.");
      router.replace("/booking-conformation"); // Navigate to the booking confirmation page
    } else if (navState.url.includes("/booking/cancel")) {
      alert("Payment was cancelled.");
      router.back(); // Go back to previous screen
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Payment</Text>
      </View>

      <WebView
        source={{ uri: paymentUrl || "https://stripe.com/docs/testing" }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-white justify-center items-center">
            <ActivityIndicator size="large" color="#40A2B2" />
            <Text className="mt-4">Loading payment page...</Text>
          </View>
        )}
        onLoad={() => setLoading(false)}
      />
    </SafeAreaView>
  );
};

export default PaymentWebView;

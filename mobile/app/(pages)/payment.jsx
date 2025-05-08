import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import axios from "axios";
import { API_URL } from "@env";

const PaymentWebView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { paymentUrl, bookingId } = params;

  const [loading, setLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Handle WebView navigation
  const handleNavigationStateChange = async (navState) => {
    // Check if the URL contains the success URL pattern
    if (navState.url.includes("/booking/success") && !paymentCompleted) {
      setPaymentCompleted(true);

      // Extract session_id from URL
      const url = new URL(navState.url);
      const sessionId = url.searchParams.get("session_id");

      if (sessionId) {
        try {
          // Verify payment
          const verifyResponse = await axios.get(
            `${API_URL}/bookings/verify-payment`,
            {
              params: { sessionId, bookingId },
            }
          );

          if (verifyResponse.data.success) {
            // Navigate to booking confirmation
            setTimeout(() => {
              router.push({
                pathname: "/booking-confirmation",
                params: { bookingId },
              });
            }, 1000);
          } else {
            alert(
              "Payment verification failed. Please contact customer support."
            );
            router.push("/home");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Error verifying payment. Please check your booking status.");
          router.push("/home");
        }
      }
    } else if (navState.url.includes("/booking/cancel")) {
      // Handle payment cancellation
      alert("Payment was cancelled. Your booking is incomplete.");
      router.push("/home");
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

      {paymentCompleted && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-white z-50 justify-center items-center">
          <ActivityIndicator size="large" color="#40A2B2" />
          <Text className="mt-4 text-lg">
            Payment completed! Redirecting...
          </Text>
        </View>
      )}

      <WebView
        source={{ uri: paymentUrl }}
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

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { trainName, date, passengers, amount, classType, from, to } = params;

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form validation
  const isFormValid = () => {
    return (
      cardNumber.replace(/\s/g, "").length === 16 &&
      expiry.length === 5 &&
      cvv.length === 3 &&
      name.length > 3
    );
  };

  // Format card number with spaces
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // Limit to 16 digits (19 with spaces)
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Handle payment submission
  const handlePayment = () => {
    if (!isFormValid()) {
      alert("Please fill in all fields correctly");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Show success message
      alert("Payment successful! Your booking is confirmed.");

      // Navigate to confirmation page
      router.replace({
        pathname: "/booking-conformation",
        params: {
          trainName,
          date,
          from,
          to,
          passengers,
          amount,
          classType,
          paymentStatus: "success",
        },
      });
    }, 2000);
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

      <ScrollView className="flex-1 p-4">
        {/* Order Summary */}
        <View className="bg-gray-50 rounded-lg p-4 mb-6">
          <Text className="font-bold text-lg mb-2">Order Summary</Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Train:</Text>
            <Text className="font-medium">{trainName}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Date:</Text>
            <Text className="font-medium">{date}</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Route:</Text>
            <Text className="font-medium">
              {from} → {to}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Class:</Text>
            <Text className="font-medium">
              {classType === "1"
                ? "1st Class"
                : classType === "2"
                ? "2nd Class"
                : "3rd Class"}
            </Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Passengers:</Text>
            <Text className="font-medium">{passengers}</Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-200 mt-2 pt-2">
            <Text className="font-bold">Total Amount:</Text>
            <Text className="font-bold text-[#40A2B2]">
              Rs.{parseFloat(amount).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text className="font-bold text-lg mb-4">Enter Payment Details</Text>

        {/* Credit Card Icons */}
        <View className="flex-row justify-start mb-4 gap-2">
          <View style={styles.cardIcon}>
            <Ionicons name="card" size={24} color="#1A1A1A" />
          </View>
          <View style={styles.cardIcon}>
            <Ionicons name="logo-paypal" size={24} color="#003087" />
          </View>
          <View style={styles.cardIcon}>
            <Ionicons name="logo-google" size={24} color="#4285F4" />
          </View>
        </View>

        {/* Card Number */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Card Number</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 text-base"
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardNumber(text))}
            maxLength={19}
          />
        </View>

        {/* Name on Card */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Cardholder Name</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 text-base"
            placeholder="John Smith"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Expiry and CVV */}
        <View className="flex-row mb-6">
          <View className="flex-1 mr-2">
            <Text className="text-gray-600 mb-1">Expiry Date</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-base"
              placeholder="MM/YY"
              keyboardType="numeric"
              value={expiry}
              onChangeText={(text) => setExpiry(formatExpiry(text))}
              maxLength={5}
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-gray-600 mb-1">CVV</Text>
            <TextInput
              className="border border-gray-300 rounded-md p-3 text-base"
              placeholder="123"
              keyboardType="numeric"
              value={cvv}
              onChangeText={(text) => setCvv(text.replace(/\D/g, ""))}
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>

        {/* Secure Payment Note */}
        <View className="flex-row items-center justify-center mb-6">
          <Ionicons name="lock-closed" size={16} color="#40A2B2" />
          <Text className="text-xs text-gray-500 ml-1">
            Payments are secure and encrypted
          </Text>
        </View>

      </ScrollView>

      {/* Payment Button */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="bg-[#40A2B2] py-4 rounded-md items-center"
          onPress={handlePayment}
          disabled={isProcessing || !isFormValid()}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">
              Pay Rs.{parseFloat(amount).toFixed(2)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardIcon: {
    width: 50,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});

export default PaymentScreen;

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";

const BookingConfirmation = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bookingId } = params;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/bookings/${bookingId}`);
        if (response.data.success) {
          setBooking(response.data.data);
        } else {
          alert("Failed to fetch booking details");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        alert("Error loading booking information");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleViewAllBookings = () => {
    router.push("/bookings");
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#40A2B2] p-6">
        <Text className="text-white text-2xl font-bold text-center">
          Booking Confirmed!
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#40A2B2" />
          <Text className="mt-4 text-gray-600">Loading booking details...</Text>
        </View>
      ) : booking ? (
        <ScrollView className="flex-1 p-5">
          {/* Success Icon */}
          <View className="items-center my-8">
            <View className="bg-green-100 rounded-full p-5">
              <Ionicons name="checkmark-circle" size={60} color="green" />
            </View>
          </View>

          {/* Booking Details */}
          <View className="bg-gray-50 rounded-lg p-5 mb-5">
            <Text className="text-lg font-bold mb-4">Booking Details</Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Booking ID:</Text>
              <Text className="font-semibold">{booking.BookingID}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Train:</Text>
              <Text className="font-semibold">{booking.train.Name}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Route:</Text>
              <Text className="font-semibold">
                {booking.journey.startStation.Name} →{" "}
                {booking.journey.endStation.Name}
              </Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Date:</Text>
              <Text className="font-semibold">{booking.Date}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Time:</Text>
              <Text className="font-semibold">{booking.Time}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Class:</Text>
              <Text className="font-semibold">{booking.Class}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Seats:</Text>
              <Text className="font-semibold">
                {booking.bookingSeats.map((seat) => seat.SeatNumber).join(", ")}
              </Text>
            </View>
          </View>

          {/* Payment Details */}
          <View className="bg-gray-50 rounded-lg p-5 mb-8">
            <Text className="text-lg font-bold mb-4">Payment Details</Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Payment ID:</Text>
              <Text className="font-semibold">{booking.payment.PaymentID}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Amount:</Text>
              <Text className="font-semibold">₹{booking.payment.Amount}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Status:</Text>
              <Text className="text-green-500 font-semibold">
                {booking.payment.Status}
              </Text>
            </View>
          </View>

          <Text className="text-sm text-gray-500 text-center mb-6">
            A copy of your booking has been sent to your email.
          </Text>

          {/* Actions */}
          <View className="space-y-3 mb-8">
            <TouchableOpacity
              onPress={handleViewAllBookings}
              className="bg-[#40A2B2] p-4 rounded-md items-center"
            >
              <Text className="text-white font-semibold">
                View All Bookings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoHome}
              className="bg-gray-200 p-4 rounded-md items-center"
            >
              <Text className="text-gray-700 font-semibold">
                Return to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center p-5">
          <Ionicons name="alert-circle" size={60} color="#ff6347" />
          <Text className="text-xl font-bold mt-4 text-center">
            Booking information not found
          </Text>
          <Text className="text-gray-600 mt-2 text-center">
            We couldn't retrieve your booking details. Please check your
            bookings section.
          </Text>
          <TouchableOpacity
            onPress={handleGoHome}
            className="bg-[#40A2B2] p-4 mt-6 rounded-md"
          >
            <Text className="text-white font-semibold">Return to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingConfirmation;

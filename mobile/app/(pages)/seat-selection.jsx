import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";

const BookingSummary = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  // Extract parameters passed from booking page
  const {
    trainId,
    trainName,
    journeyId,
    startStation,
    endStation,
    date,
    passengers,
    class: classType,
    startStationName, // New: Get station names directly if available
    endStationName, // New: Get station names directly if available
    price: basePrice = 0, // New: Get price directly if available
  } = params;

  // State variables
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [stationNames, setStationNames] = useState({
    start: startStationName || "",
    end: endStationName || "",
  });
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate prices based on class type and passenger count
  useEffect(() => {
    // If we don't have station names yet, try to get them from station IDs
    const fetchStationNames = async () => {
      if (!stationNames.start || !stationNames.end) {
        try {
          setLoading(true);
          const [startResponse, endResponse] = await Promise.all([
            axios.get(`${API_URL}/stations/${startStation}`),
            axios.get(`${API_URL}/stations/${endStation}`),
          ]);

          setStationNames({
            start: startResponse.data?.data?.Name || "Departure",
            end: endResponse.data?.data?.Name || "Arrival",
          });
        } catch (error) {
          console.error("Error fetching station names:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStationNames();

    // Calculate price based on class type
    let parsedBasePrice = parseFloat(basePrice) || 100;
    let classMultiplier = 1;

    switch (parseInt(classType)) {
      case 1:
        classMultiplier = 1.5;
        break;
      case 2:
        classMultiplier = 1;
        break;
      case 3:
        classMultiplier = 0.75;
        break;
      default:
        classMultiplier = 1;
    }

    const pricePerSeat = Math.round(parsedBasePrice * classMultiplier);
    setPrice(pricePerSeat);
    setTotalPrice(pricePerSeat * parseInt(passengers));

    console.log(
      `Price calculation: ${parsedBasePrice} × ${classMultiplier} × ${passengers} = ${
        pricePerSeat * parseInt(passengers)
      }`
    );
  }, [startStation, endStation, basePrice, classType, passengers]);

  // Replace the handleCreateBooking function with this implementation:

  const handleCreateBooking = async () => {
    if (!user) {
      alert("Please sign in to book tickets");
      router.push("/sign-in");
      return;
    }

    setBookingLoading(true);

    try {
      // Generate seat numbers automatically (we're not selecting specific seats)
      const seatNumbers = Array.from(
        { length: parseInt(passengers) },
        (_, i) => `Auto-${i + 1}`
      );

      console.log("Proceeding directly to payment for:", {
        trainId,
        trainName,
        journeyId,
        passengerNIC: user.PassengerNIC,
        classType,
        noOfSeats: parseInt(passengers),
        email: user.Email,
        date,
        amount: totalPrice,
      });

      // Skip booking creation and go directly to payment
      const paymentResponse = await axios.post(
        `${API_URL}/bookings/create-payment-intent`,
        {
          // Include all booking data in the payment request
          // so it can be saved after successful payment
          bookingData: {
            trainId,
            journeyId,
            passengerNIC: user.PassengerNIC,
            classType: parseInt(classType),
            noOfSeats: parseInt(passengers),
            email: user.Email,
            date,
            time: "08:00:00",
            seatNumbers,
            amount: totalPrice,
          },
          amount: totalPrice,
          trainDetails: {
            trainName,
            class: classType,
            date,
            time: "08:00:00",
          },
          seats: seatNumbers,
        }
      );

      console.log("Payment response:", paymentResponse.data);

      if (paymentResponse.data.success) {
        // Show success message
        alert("Redirecting to payment portal...");

        // Redirect to payment URL
        router.push({
          pathname: "/payment-webview",
          params: {
            paymentUrl: paymentResponse.data.url,
            // Pass temporary booking data as params if needed for confirmation
            trainName,
            date,
            passengers,
            amount: totalPrice,
            classType,
          },
        });
      } else {
        alert("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert("An error occurred while processing your payment request");
    } finally {
      setBookingLoading(false);
    }
  };

  // Get class name from class number
  const getClassName = (classNum) => {
    switch (parseInt(classNum)) {
      case 1:
        return "1st Class";
      case 2:
        return "2nd Class";
      case 3:
        return "3rd Class";
      default:
        return "Standard";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Booking Summary</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#40A2B2" />
          <Text className="mt-4 text-gray-600">Loading journey details...</Text>
        </View>
      ) : (
        <>
          {/* Train & Journey Info Card */}
          <ScrollView className="flex-1 p-4">
            <View className="bg-white rounded-lg shadow-md p-4 mb-4">
              <Text className="font-bold text-xl text-[#40A2B2] mb-2">
                {trainName}
              </Text>

              <View className="flex-row items-center mb-4">
                <View className="flex-1">
                  <Text className="text-gray-500">From</Text>
                  <Text className="font-semibold text-lg">
                    {stationNames.start}
                  </Text>
                </View>
                <View className="items-center px-4">
                  <Ionicons name="arrow-forward" size={20} color="#40A2B2" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500">To</Text>
                  <Text className="font-semibold text-lg">
                    {stationNames.end}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between border-t border-gray-100 pt-3 mb-2">
                <View>
                  <Text className="text-gray-500">Date</Text>
                  <Text className="font-semibold">{date}</Text>
                </View>
                <View>
                  <Text className="text-gray-500">Class</Text>
                  <Text className="font-semibold">
                    {getClassName(classType)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Rest of the component remains the same */}
            {/* Passenger Details */}
            <View className="bg-white rounded-lg shadow-md p-4 mb-4">
              <Text className="font-bold text-lg mb-3">Passenger Details</Text>

              {user && (
                <>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Name</Text>
                    <Text className="font-semibold">
                      {user.Name || user.PassengerNIC}
                    </Text>
                  </View>

                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Email</Text>
                    <Text className="font-semibold">{user.Email}</Text>
                  </View>
                </>
              )}

              <View className="flex-row justify-between border-t border-gray-100 pt-3">
                <Text className="text-gray-500">Number of Passengers</Text>
                <Text className="font-semibold">{passengers}</Text>
              </View>
            </View>

            {/* Pricing Summary */}
            <View className="bg-white rounded-lg shadow-md p-4 mb-8">
              <Text className="font-bold text-lg mb-3">Price Summary</Text>

              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500">Price per passenger</Text>
                <Text className="font-semibold">Rs.{price.toFixed(2)}</Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-500">Passengers</Text>
                <Text className="font-semibold">× {passengers}</Text>
              </View>

              {parseInt(passengers) > 1 && (
                <View className="flex-row justify-between mb-2 border-t border-gray-100 pt-2">
                  <Text className="text-gray-500">Subtotal</Text>
                  <Text className="font-semibold">
                    Rs.{(price * parseInt(passengers)).toFixed(2)}
                  </Text>
                </View>
              )}

              <View className="flex-row justify-between border-t border-gray-200 mt-3 pt-3">
                <Text className="font-bold text-lg">Total Price</Text>
                <Text className="font-bold text-lg text-[#40A2B2]">
                  Rs.{totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Notes/Policy */}
            <View className="bg-gray-50 rounded-lg p-4 mb-8">
              <Text className="text-sm text-gray-500 italic">
                Note: Your seats will be automatically assigned based on
                availability. Tickets are non-refundable after 24 hours before
                departure.
              </Text>
            </View>
          </ScrollView>
          {/* Bottom action bar */}
          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity
              className="bg-[#40A2B2] py-4 rounded-md items-center"
              onPress={() => {
                // Navigate to our custom payment page
                router.push({
                  pathname: "/payment",
                  params: {
                    trainName,
                    date,
                    passengers,
                    amount: totalPrice,
                    classType,
                    from: stationNames.start,
                    to: stationNames.end,
                  },
                });
              }}
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Proceed to Payment
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default BookingSummary;

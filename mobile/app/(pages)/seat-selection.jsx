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

const SeatSelection = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  // Extract parameters
  const {
    trainId,
    trainName,
    journeyId,
    startStation,
    endStation,
    date,
    passengers,
    class: classType,
  } = params;

  // State variables
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [stationNames, setStationNames] = useState({ start: "", end: "" });

  // Calculate price per seat based on journey price and class
  const [price, setPrice] = useState(0);

  // Fetch seats data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get station names
        const [startResponse, endResponse] = await Promise.all([
          axios.get(`${API_URL}/stations/${startStation}`),
          axios.get(`${API_URL}/stations/${endStation}`),
        ]);

        if (startResponse.data.success && endResponse.data.success) {
          setStationNames({
            start: startResponse.data.data.Name,
            end: endResponse.data.data.Name,
          });

          // Get booked seats
          const bookedSeatsResponse = await axios.get(
            `${API_URL}/bookings/findBookedSeats`,
            {
              params: {
                startStationName: startResponse.data.data.Name,
                endStationName: endResponse.data.data.Name,
                date: date,
              },
            }
          );

          // Get journey price
          const journeyResponse = await axios.get(
            `${API_URL}/journeys/${journeyId}`
          );

          if (journeyResponse.data.success) {
            // Calculate price based on class
            let basePrice = journeyResponse.data.data.Price;
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

            setPrice(Math.round(basePrice * classMultiplier));
          }

          if (bookedSeatsResponse.data.success) {
            // Extract booked seat numbers
            const booked = bookedSeatsResponse.data.data.bookedSeats.map(
              (seat) => seat.SeatNumber
            );
            setBookedSeats(booked);

            // Get all seats for this train and class type
            const allSeatsResponse = await axios.get(`${API_URL}/seats`, {
              params: {
                trainId,
                classType,
              },
            });

            if (allSeatsResponse.data.success) {
              // Filter out booked seats
              const availableSeatsData = allSeatsResponse.data.data.filter(
                (seat) => !booked.includes(seat.SeatNumber)
              );
              setAvailableSeats(availableSeatsData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching seat data:", error);
        alert("Failed to load seat information");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trainId, journeyId, startStation, endStation, date, classType]);

  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    const isSelected = selectedSeats.some(
      (s) => s.SeatNumber === seat.SeatNumber
    );

    if (isSelected) {
      // Deselect the seat
      setSelectedSeats(
        selectedSeats.filter((s) => s.SeatNumber !== seat.SeatNumber)
      );
    } else {
      // Check if we've already selected the max number of seats
      if (selectedSeats.length >= parseInt(passengers)) {
        alert(`You can only select ${passengers} seat(s)`);
        return;
      }

      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Create booking
  const handleCreateBooking = async () => {
    if (selectedSeats.length < parseInt(passengers)) {
      alert(`Please select ${passengers} seat(s)`);
      return;
    }

    if (!user) {
      alert("Please sign in to book tickets");
      router.push("/sign-in");
      return;
    }

    setBookingLoading(true);

    try {
      const totalAmount = price * selectedSeats.length;
      const seatNumbers = selectedSeats.map((seat) => seat.SeatNumber);

      // Create booking
      const response = await axios.post(`${API_URL}/bookings`, {
        trainId,
        journeyId,
        passengerNIC: user.PassengerNIC,
        classType,
        noOfSeats: selectedSeats.length,
        email: user.Email,
        date,
        time: "08:00:00", // You may want to get this from train data
        seatNumbers,
        amount: totalAmount,
      });

      if (response.data.success) {
        // Proceed to payment
        const paymentResponse = await axios.post(
          `${API_URL}/bookings/create-payment-intent`,
          {
            bookingId: response.data.data.bookingId,
            amount: totalAmount,
            trainDetails: {
              trainName,
              class: classType,
              date,
              time: "08:00:00", // Same as above
            },
            seats: seatNumbers,
          }
        );

        if (paymentResponse.data.success) {
          // Redirect to payment URL or handle in-app payment
          router.push({
            pathname: "/payment-webview",
            params: {
              paymentUrl: paymentResponse.data.url,
              bookingId: response.data.data.bookingId,
            },
          });
        } else {
          alert("Failed to create payment. Please try again.");
        }
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating your booking");
    } finally {
      setBookingLoading(false);
    }
  };

  // Render a seat
  const renderSeat = (seat) => {
    const isBooked = bookedSeats.includes(seat.SeatNumber);
    const isSelected = selectedSeats.some(
      (s) => s.SeatNumber === seat.SeatNumber
    );

    let bgColor = "bg-gray-200"; // Available seat
    if (isBooked) bgColor = "bg-gray-400"; // Booked seat
    if (isSelected) bgColor = "bg-green-500"; // Selected seat

    return (
      <TouchableOpacity
        key={seat.SeatNumber}
        className={`w-12 h-12 m-1 rounded-md items-center justify-center ${bgColor}`}
        disabled={isBooked}
        onPress={() => toggleSeatSelection(seat)}
      >
        <Text className={isSelected ? "text-white" : "text-black"}>
          {seat.SeatNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Select Seats</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#40A2B2" />
          <Text className="mt-4 text-gray-600">Loading seats...</Text>
        </View>
      ) : (
        <>
          {/* Journey Info */}
          <View className="bg-blue-50 p-4">
            <Text className="font-bold text-lg">{trainName}</Text>
            <View className="flex-row justify-between mt-1">
              <Text className="text-gray-600">
                {stationNames.start} → {stationNames.end}
              </Text>
              <Text className="text-gray-600">{date}</Text>
            </View>
            <Text className="mt-1">Class: {classType}</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="font-semibold">Price per seat: ₹{price}</Text>
              <Text className="font-semibold">Passengers: {passengers}</Text>
            </View>
          </View>

          {/* Seat Legend */}
          <View className="flex-row justify-around bg-gray-100 p-3">
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-gray-200 mr-2 rounded"></View>
              <Text>Available</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-gray-400 mr-2 rounded"></View>
              <Text>Booked</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-green-500 mr-2 rounded"></View>
              <Text>Selected</Text>
            </View>
          </View>

          {/* Seat Map */}
          <ScrollView className="flex-1 p-4">
            <Text className="text-xl font-bold mb-4">Select your seats</Text>

            {/* Front of the train indicator */}
            <View className="items-center mb-6">
              <View className="w-20 h-1 bg-gray-400"></View>
              <Text className="text-gray-500 mt-1">Front</Text>
            </View>

            <View className="flex-row flex-wrap justify-center">
              {availableSeats.map((seat) => renderSeat(seat))}
            </View>

            {/* Selected seats summary */}
            <View className="mt-6 p-4 bg-gray-50 rounded-lg">
              <Text className="font-bold mb-2">
                Selected Seats ({selectedSeats.length}/{passengers})
              </Text>
              <View className="flex-row flex-wrap">
                {selectedSeats.map((seat) => (
                  <View
                    key={seat.SeatNumber}
                    className="bg-green-100 rounded-full px-3 py-1 m-1"
                  >
                    <Text>{seat.SeatNumber}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Total price */}
            <View className="bg-gray-50 p-4 rounded-lg mt-4">
              <View className="flex-row justify-between">
                <Text>Price per seat:</Text>
                <Text>₹{price}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Number of seats:</Text>
                <Text>{selectedSeats.length}</Text>
              </View>
              <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
                <Text className="font-bold">Total:</Text>
                <Text className="font-bold">
                  ₹{price * selectedSeats.length}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom action bar */}
          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity
              className="bg-[#40A2B2] py-4 rounded-md items-center"
              onPress={handleCreateBooking}
              disabled={
                selectedSeats.length < parseInt(passengers) || bookingLoading
              }
            >
              {bookingLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Continue to Payment
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SeatSelection;

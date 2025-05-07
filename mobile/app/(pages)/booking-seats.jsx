import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BookingSeats = () => {
  const router = useRouter();
  const [selectedCart, setSelectedCart] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalCarts = 3;

  const renderSeat = (seatNumber, isWindow = false) => {
    const isSelected = selectedSeats.includes(seatNumber);

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelectedSeats(
              selectedSeats.filter((seat) => seat !== seatNumber)
            );
          } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
          }
        }}
        className={`h-16 w-16 m-1 rounded-lg justify-center items-center
        ${isWindow ? "mr-8" : ""}`}
      >
        <MaterialCommunityIcons
          name={isWindow ? "seat-recline-extra" : "seat-passenger"}
          size={32}
          color={isSelected ? "#40A2B2" : "#D1D5DB"}
          style={{
            transform: [{ rotate: isWindow ? "0deg" : "0deg" }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
        <Text
          className={`font-medium text-xs mt-1 ${
            isSelected ? "text-[#40A2B2]" : "text-gray-700"
          }`}
        >
          {seatNumber}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCart = (cartNumber) => {
    const startSeat = (cartNumber - 1) * 20 + 1;

    return (
      <View className="p-6 bg-white rounded-lg shadow-lg m-4">
        <Text className="text-lg font-bold text-[#111B47] mb-6">
          Cart {cartNumber}
        </Text>

        <View className="flex-row justify-center mb-8">
          <View className="mr-8">
            {[0, 1, 2, 3, 4].map((row) => (
              <View key={row} className="flex-row mb-4">
                {renderSeat(startSeat + row * 4, true)}
                {renderSeat(startSeat + row * 4 + 1)}
              </View>
            ))}
          </View>

          <View>
            {[0, 1, 2, 3, 4].map((row) => (
              <View key={row} className="flex-row mb-4">
                {renderSeat(startSeat + row * 4 + 2)}
                {renderSeat(startSeat + row * 4 + 3, true)}
              </View>
            ))}
          </View>
        </View>

        <View className="border-t border-gray-200 pt-4">
          <Text className="text-sm text-gray-500 text-center">
            Window seats are marked with extra recline
          </Text>
        </View>
      </View>
    );
  };

  const renderLegend = () => (
    <View className="px-4 py-2 bg-white border-t border-gray-200">
      <View className="flex-row justify-center items-center space-x-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="seat-passenger"
            size={24}
            color="#D1D5DB"
          />
          <Text className="text-gray-600 ml-2">Available</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="seat-passenger"
            size={24}
            color="#40A2B2"
          />
          <Text className="text-gray-600 ml-2">Selected</Text>
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="seat-recline-extra"
            size={24}
            color="#D1D5DB"
          />
          <Text className="text-gray-600 ml-2">Window</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#111B47" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2 text-[#111B47]">
          Select Seats
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {[...Array(totalCarts)].map((_, index) => (
          <View key={index} style={{ width }}>
            {renderCart(index + 1)}
          </View>
        ))}
      </ScrollView>
      {renderLegend()}
      <View className="flex-row justify-center items-center p-4 bg-white">
        {[...Array(totalCarts)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCart(index + 1)}
            className={`h-2 w-2 rounded-full mx-1
              ${selectedCart === index + 1 ? "bg-[#40A2B2]" : "bg-gray-300"}`}
          />
        ))}
      </View>

      <View className="p-4 bg-white border-t border-gray-200">
        <Text className="text-[#111B47] font-medium mb-2">
          Selected Seats: {selectedSeats.join(", ")}
        </Text>
        <TouchableOpacity
          className="p-4 rounded-md bg-[#40A2B2]"
          onPress={() => router.push("/payment")}
        >
          <Text className="font-medium text-center text-white">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingSeats;

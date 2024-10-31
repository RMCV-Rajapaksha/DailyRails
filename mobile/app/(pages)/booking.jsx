import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HeroSection from '../../components/HeroSection';

const Booking = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2">Book Ticket</Text>
      </View>

      <ScrollView className="flex-1">
        <HeroSection />

        <View className="p-6 space-y-4">
          <View>
            <Text className="mb-1 text-gray-600">From</Text>
            <TextInput
              placeholder="Badulla"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-600">To</Text>
            <TextInput
              placeholder="Colombo Fort"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-600">Date</Text>
            <TextInput
              placeholder="2024/12/8"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </View>

          <View>
            <Text className="mb-1 text-gray-600">Number of Passengers</Text>
            <TextInput
              placeholder="2"
              keyboardType="numeric"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </View>

          <View className="flex-row mt-6 space-x-4">
            <TouchableOpacity className="flex-1 p-4 rounded-md bg-[#40A2B2]">
              <Text className="font-medium text-center text-white">Search</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 p-4 rounded-md bg-[#40A2B2]">
              <Text className="font-medium text-center text-white">Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Booking;
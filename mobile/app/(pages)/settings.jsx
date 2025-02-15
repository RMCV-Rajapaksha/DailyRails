import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header with back button */}
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#111B47" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#111B47] ml-2">
            Settings
          </Text>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Email (non-editable) */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Email
            </Text>
            <TextInput
              value="john.doe@example.com"
              editable={false}
              className="bg-gray-100 p-3 rounded-lg text-gray-600"
            />
          </View>

          {/* Name */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-1">Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-white border border-gray-300 p-3 rounded-lg"
            />
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="bg-white border border-gray-300 p-3 rounded-lg"
              placeholder="Enter your phone number"
            />
          </View>

          {/* Address */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-600 mb-1">
              Address
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              className="bg-white border border-gray-300 p-3 rounded-lg"
              placeholder="Enter your address"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-[#40A2B2] p-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-center text-lg">
              Save Changes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

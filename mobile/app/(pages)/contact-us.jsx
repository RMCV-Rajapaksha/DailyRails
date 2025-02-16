import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "@env";

const SUPPORT_PHONE_NUMBER = "+94123456789";

const ContactUs = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: "",
    NIC: "",
    Type: "",
    Description: "",
    ClosestStation: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCall = () => {
    let phoneNumber = SUPPORT_PHONE_NUMBER;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${SUPPORT_PHONE_NUMBER}`;
    } else {
      phoneNumber = `tel:${SUPPORT_PHONE_NUMBER}`;
    }

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic required field validation
    const fields = {
      Name: "Name",
      NIC: "NIC number",
      Type: "Report type",
      Description: "Description",
      ClosestStation: "Closest station",
    };

    // Check if required fields are empty
    Object.keys(fields).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${fields[field]} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/reports`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);
      Alert.alert("Success", "Report submitted successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error details:", error.response?.data);
      // Display backend validation errors
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).join("\n")
        : error.response?.data?.error ||
          "Failed to submit report. Please try again.";

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Ionicons name="chevron-back" size={24} color="#111B47" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#111B47] ml-2">
              Contact Us
            </Text>
          </View>

          {/* Call Support Button */}
          <TouchableOpacity
            onPress={handleCall}
            className="flex-row items-center justify-center bg-[#40A2B2] p-4 rounded-xl mb-6"
          >
            <Ionicons name="call" size={24} color="white" />
            <Text className="text-white font-semibold ml-2">
              Call Customer Support
            </Text>
          </TouchableOpacity>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="mb-1 text-gray-600">Your Name *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.Name ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.Name}
                onChangeText={(text) =>
                  setFormData({ ...formData, Name: text })
                }
                placeholder="Enter your name"
              />
              {errors.Name && (
                <Text className="text-red-500 text-sm mt-1">{errors.Name}</Text>
              )}
            </View>

            <View>
              <Text className="mb-1 text-gray-600">NIC Number *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.NIC ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.NIC}
                onChangeText={(text) => setFormData({ ...formData, NIC: text })}
                placeholder="Enter your NIC number"
              />
              {errors.NIC && (
                <Text className="text-red-500 text-sm mt-1">{errors.NIC}</Text>
              )}
            </View>

            <View>
              <Text className="mb-1 text-gray-600">Closest Station *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.ClosestStation ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.ClosestStation}
                onChangeText={(text) =>
                  setFormData({ ...formData, ClosestStation: text })
                }
                placeholder="Enter nearest station name"
              />
              {errors.ClosestStation && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.ClosestStation}
                </Text>
              )}
            </View>
            <View>
              <Text className="mb-1 text-gray-600">Report Type *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.Type ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.Type}
                onChangeText={(text) =>
                  setFormData({ ...formData, Type: text })
                }
                placeholder="Enter report type (min 10 characters)"
              />
              {errors.Type && (
                <Text className="text-red-500 text-sm mt-1">{errors.Type}</Text>
              )}
            </View>
            <View>
              <Text className="mb-1 text-gray-600">Issue Description *</Text>
              <TextInput
                className={`p-4 border rounded-lg ${
                  errors.Description ? "border-red-500" : "border-gray-300"
                } min-h-[120px]`}
                value={formData.Description}
                onChangeText={(text) =>
                  setFormData({ ...formData, Description: text })
                }
                placeholder="Describe your issue in detail"
                multiline
                textAlignVertical="top"
                numberOfLines={4}
              />
              {errors.Description && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.Description}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              className={`py-3 rounded-lg ${
                loading ? "bg-gray-400" : "bg-[#40A2B2]"
              }`}
            >
              <Text className="text-white text-center font-semibold">
                {loading ? "Submitting..." : "Submit Report"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

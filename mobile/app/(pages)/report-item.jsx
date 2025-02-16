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
import axios from "axios";
import { API_URL } from "@env";
import { useRouter } from "expo-router";

const ReportItem = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    ItemType: "Lost", // or 'Found'
    ContactNo: "",
    ReporterName: "",
    Location: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.ReporterName.trim()) {
      newErrors.ReporterName = "Name is required";
    } else if (formData.ReporterName.length > 20) {
      newErrors.ReporterName = "Name should be less than 20 characters";
    }

    // Other validations
    if (!formData.Title.trim()) newErrors.Title = "Title is required";
    if (!formData.Description.trim())
      newErrors.Description = "Description is required";
    if (!formData.ContactNo.trim())
      newErrors.ContactNo = "Contact number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple submissions

    if (!validateForm()) {
      Alert.alert("Error", "Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const formattedData = {
        Name: formData.ReporterName.trim(),
        ItemType: formData.ItemType,
        Title: formData.Title.trim(),
        Description: formData.Description.trim(),
        ContactNo: formData.ContactNo.trim(),
      };

      const response = await axios.post(`${API_URL}/items`, formattedData);

      if (response.data.success) {
        Alert.alert(
          "Thank You! 🎉",
          "Your report has been submitted successfully. We'll review it shortly.",
          [
            {
              text: "OK",
              onPress: () => router.back(),
              style: "default",
            },
          ],
          { cancelable: false }
        );
      } else {
        throw new Error(response.data.message || "Failed to submit report");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to submit report. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header with Back Button */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <Ionicons name="chevron-back" size={24} color="#111B47" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-[#111B47] ml-2">
              Report Lost or Found Item
            </Text>
          </View>

          {/* Form Fields */}
          <View className="space-y-5">
            {/* Reporter Name */}
            <View>
              <Text className="mb-1 text-gray-600">Your Name *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.ReporterName ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.ReporterName}
                onChangeText={(text) =>
                  setFormData({ ...formData, ReporterName: text })
                }
                placeholder="Enter your name"
              />
              {errors.ReporterName && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.ReporterName}
                </Text>
              )}
            </View>

            {/* Item Type Selection */}
            <View>
              <Text className="mb-2 text-gray-600">Item Type *</Text>
              <View className="flex-row space-x-4">
                {["Lost", "Found"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setFormData({ ...formData, ItemType: type })}
                    className={`flex-row items-center px-4 py-2 rounded-xl border ${
                      formData.ItemType === type
                        ? "bg-[#40A2B2] border-[#40A2B2]"
                        : "border-gray-300"
                    }`}
                  >
                    <Text
                      className={`${
                        formData.ItemType === type
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Title */}
            <View>
              <Text className="mb-1 text-gray-600">Title *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.Title ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.Title}
                onChangeText={(text) =>
                  setFormData({ ...formData, Title: text })
                }
                placeholder="Brief title describing the item"
              />
              {errors.Title && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.Title}
                </Text>
              )}
            </View>

            {/* Description */}
            <View>
              <Text className="mb-1 text-gray-600">Description *</Text>
              <TextInput
                className={`p-4 border rounded-lg ${
                  errors.Description ? "border-red-500" : "border-gray-300"
                } min-h-[160px]`} // Increased padding and minimum height
                value={formData.Description}
                onChangeText={(text) =>
                  setFormData({ ...formData, Description: text })
                }
                placeholder="Detailed description of the item"
                multiline
                numberOfLines={6} // Increased number of lines
                textAlignVertical="top"
              />
              {errors.Description && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.Description}
                </Text>
              )}
            </View>

            {/* Contact Number */}
            <View>
              <Text className="mb-1 text-gray-600">Contact Number *</Text>
              <TextInput
                className={`p-3 border rounded-lg ${
                  errors.ContactNo ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.ContactNo}
                onChangeText={(text) =>
                  setFormData({ ...formData, ContactNo: text })
                }
                placeholder="Your contact number"
                keyboardType="phone-pad"
              />
              {errors.ContactNo && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.ContactNo}
                </Text>
              )}
            </View>

            {/* Submit Button */}
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

export default ReportItem;

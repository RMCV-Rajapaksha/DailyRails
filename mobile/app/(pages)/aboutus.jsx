import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { images } from "../../constants";
import { Image } from "react-native";
function AboutUs() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header with back button */}
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#111B47" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#111B47] ml-2">
            About Us
          </Text>
        </View>

        <ScrollView className="flex-1 p-6">
          {/* App Logo/Icon */}
          <View className="items-center mb-6">
            <Image
              source={images.logo}
              style={{ height: height * 0.1, aspectRatio: 1 }}
              resizeMode="contain"
            />
          </View>

          {/* App Name and Version */}
          <View className="items-center mb-8">
            <Text className="text-gray-500">Version 1.0.0</Text>
          </View>

          {/* App Description */}
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-[#111B47] mb-2">
              About DailyRails
            </Text>

            <Text className="text-gray-600 leading-6">
              DailyRails is your comprehensive train tracking and scheduling
              companion, designed to make your railway journey experience
              seamless and efficient.
            </Text>

            <Text className="text-gray-600 leading-6">
              Our app provides real-time train tracking, accurate scheduling
              information, and user-friendly features to help you plan and
              monitor your train travels effectively.
            </Text>

            <Text className="text-lg font-semibold text-[#111B47] mt-4 mb-2">
              Key Features
            </Text>

            <View className="space-y-2">
              <Text className="text-gray-600">• Real-time train tracking</Text>
              <Text className="text-gray-600">• Live location updates</Text>
              <Text className="text-gray-600">• User-friendly interface</Text>
              <Text className="text-gray-600">
                • Reliable scheduling information
              </Text>
            </View>

            <Text className="text-lg font-semibold text-[#111B47] mt-4 mb-2">
              Contact Us
            </Text>

            <Text className="text-gray-600">
              Email: support@dailyrails.com{"\n"}
              Website: www.dailyrails.com
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default AboutUs;

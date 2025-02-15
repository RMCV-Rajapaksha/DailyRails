import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const menuItems = [
  {
    icon: "settings-outline",
    title: "Settings",
    route: "/(pages)/settings",
  },
  {
    icon: "information-circle-outline",
    title: "About Us",
    route: "/(pages)/aboutus",
  },
];

function Account() {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLogoutPressed, setIsLogoutPressed] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Profile Section with more top margin */}
          <View className="items-center mb-8 mt-12">
            <View className="bg-[#40A2B2] w-24 h-24 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={48} color="white" />
            </View>
            <Text className="text-xl font-bold text-[#111B47]">John Doe</Text>
            <Text className="text-sm text-gray-500">john.doe@example.com</Text>
          </View>

          {/* Menu Items - Shorter buttons */}
          <View className="px-6">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-[#40A2B2] rounded-xl p-3 mb-3 flex-row items-center"
                onPress={() => router.push(item.route)}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 3,
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color="white"
                  className="mr-3"
                />
                <Text className="font-semibold text-white text-lg ml-2">
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Separate Logout Button */}
            <Pressable
              onPressIn={() => setIsLogoutPressed(true)}
              onPressOut={() => setIsLogoutPressed(false)}
              onPress={() => {
                console.log("Logging out...");
                router.push("/(auth)/sign-in");
              }}
              className={`mt-6 rounded-lg p-3 flex-row items-center w-full ${
                isLogoutPressed ? "bg-red-50" : "bg-transparent"
              }`}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color="#DC2626" // text-red-600 equivalent
                style={{ width: 20, height: 20 }}
              />
              <Text
                className="ml-3 font-medium text-lg text-[#DC2626]" // text-red-600 equivalent
              >
                Logout
              </Text>
            </Pressable>
          </View>

          {/* Version Info */}
          <View className="items-center mt-12">
            <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Account;

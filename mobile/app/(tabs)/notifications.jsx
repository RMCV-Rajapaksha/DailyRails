import React, { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_REPORT") {
        setNotifications((prev) => [
          ...prev,
          {
            title: "New Report",
            message: `A new report has been submitted by ${data.data.Name}`,
            timestamp: new Date(),
          },
        ]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-[#111B47]">
            Notifications
          </Text>
        </View>

        {notifications.length === 0 ? (
          // Empty state
          <View className="flex-1 items-center justify-center">
            <Ionicons
              name="notifications-outline"
              size={64}
              color="#9CA3AF" // gray-400
            />
            <Text className="text-gray-400 mt-4 text-lg">
              No notifications yet
            </Text>
          </View>
        ) : (
          // Notifications list
          <ScrollView className="flex-1">
            {notifications.map((notification, index) => (
              <View
                key={index}
                className="p-4 border-b border-gray-200 flex-row items-center"
              >
                <Ionicons name="notifications" size={24} color="#40A2B2" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-800 font-medium">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {notification.message}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Notifications;

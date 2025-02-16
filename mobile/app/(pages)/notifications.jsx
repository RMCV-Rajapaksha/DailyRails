import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://10.0.2.2:4000"); // Use 10.0.2.2 for Android emulator

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_NOTIFICATION") {
        setNotifications((prev) => [
          {
            id: Date.now(),
            title: data.title,
            message: data.message,
            timestamp: new Date(),
            type: data.notificationType,
            read: false,
          },
          ...prev,
        ]);
      }
    };

    return () => ws.close();
  }, []);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4 border-b border-gray-200 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="chevron-back" size={24} color="#111B47" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#111B47] ml-2">
            Notifications
          </Text>
        </View>

        {notifications.length === 0 ? (
          <View className="flex-1 items-center justify-center p-4">
            <Ionicons name="notifications-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-400 mt-4 text-lg text-center">
              No notifications yet
            </Text>
            <Text className="text-gray-400 mt-2 text-sm text-center">
              We'll notify you when something important happens
            </Text>
          </View>
        ) : (
          <ScrollView className="flex-1">
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className={`p-4 border-b border-gray-100 flex-row items-start ${
                  !notification.read ? "bg-blue-50" : "bg-white"
                }`}
              >
                <View className="h-10 w-10 rounded-full bg-[#40A2B2] items-center justify-center mr-3">
                  <Ionicons
                    name={
                      notification.type === "REPORT"
                        ? "document-text"
                        : "notifications"
                    }
                    size={20}
                    color="white"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {notification.message}
                  </Text>
                  <Text className="text-[#40A2B2] text-xs mt-2">
                    {formatTime(notification.timestamp)}
                  </Text>
                </View>
                {!notification.read && (
                  <View className="h-2 w-2 rounded-full bg-[#40A2B2]" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Notifications;

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { icons, images } from "../../constants";
import axios from "axios";
import { API_URL } from "@env";

const { width, height } = Dimensions.get("window");

const menuItems = [
  {
    icon: icons.map,
    title: "Map",
    subtitle: "Track your live location",
    route: "/(pages)/map",
  },
  {
    icon: icons.schedule,
    title: "Train Schedule",
    subtitle: "View train schedules",
    route: "/(pages)/schedule",
  },
  {
    icon: icons.booking,
    title: "Ticket Booking",
    subtitle: "Book your tickets",
    route: "/(pages)/booking",
  },
  {
    icon: icons.lostAndFound,
    title: "Lost and Found",
    subtitle: "Report or find lost items",
    isExpandable: true,
    subItems: [
      {
        title: "Report Lost or Found Item",
        subtitle: "Submit a new report",
        route: "/(pages)/report-item",
      },
      {
        title: "Lost and Found Items",
        subtitle: "View all items",
        route: "/(pages)/lost-and-found",
      },
    ],
  },
  {
    icon: icons.contact,
    title: "Contact Us",
    subtitle: "Get in touch with us",
    route: "/(pages)/contact-us",
  },
];

const NotificationOverlay = ({ visible, onClose, notifications }) => {
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
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50">
        <View className="absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-xl max-h-[70%]">
          <View className="p-4 border-b border-gray-200 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-[#111B47]">
              Notifications
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#111B47" />
            </TouchableOpacity>
          </View>

          {notifications.length === 0 ? (
            <View className="p-8 items-center">
              <Ionicons
                name="notifications-outline"
                size={64}
                color="#9CA3AF"
              />
              <Text className="text-gray-400 mt-4 text-lg text-center">
                No notifications yet
              </Text>
              <Text className="text-gray-400 mt-2 text-sm text-center">
                We'll notify you when something important happens
              </Text>
            </View>
          ) : (
            <ScrollView className="max-h-[500px]">
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
      </View>
    </Modal>
  );
};

const Home = () => {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState(null);
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://10.0.2.2:4000");

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
        setNotificationCount((prev) => prev + 1);
      }
    };

    return () => ws.close();
  }, []);

  const handleNotificationPress = () => {
    setShowNotifications(true);
    setNotificationCount(0);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleItemPress = (item, index) => {
    if (item.isExpandable) {
      setExpandedItem(expandedItem === index ? null : index);
      Animated.timing(rotationAnimation, {
        toValue: expandedItem === index ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      router.push(item.route);
    }
  };

  const OfferCard = ({ offer }) => (
    <TouchableOpacity
      className="mr-4 rounded-2xl overflow-hidden"
      style={{ width: width * 0.7, backgroundColor: offer.bgColor }}
    >
      <View className="p-4">
        <Text className="text-lg font-bold text-[#111B47] mb-2">
          {offer.title}
        </Text>
        <Text className="text-sm text-[#111B47] mb-4">{offer.description}</Text>
        {offer.image && (
          <Image
            source={offer.image}
            style={{ width: "100%", height: 120, borderRadius: 12 }}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const rotation = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const AnnouncementCard = ({ announcement }) => (
    <TouchableOpacity
      className="mr-4 rounded-2xl overflow-hidden bg-white border border-gray-100"
      style={{ width: width * 0.8 }}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-bold text-[#111B47]">
            {announcement.Title}
          </Text>
          <Text className="text-xs text-gray-500">
            {new Date(announcement.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Text className="text-sm text-gray-600 mb-2">
          {announcement.Description}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="megaphone-outline" size={16} color="#40A2B2" />
          <Text className="text-xs text-[#40A2B2] ml-1">
            For: {announcement.AnnouncementTo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Update Logo section to include notification bell */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1 items-center">
              <Image
                source={images.logo}
                style={{ height: height * 0.1, aspectRatio: 1 }}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              onPress={handleNotificationPress}
              className="absolute right-0"
            >
              <View className="relative">
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color="#40A2B2"
                />
                {notificationCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {notificationCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Announcements section */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-[#111B47]">
                Latest News
              </Text>
              <TouchableOpacity onPress={fetchAnnouncements}>
                <Ionicons name="refresh" size={24} color="#40A2B2" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View className="h-32 justify-center items-center">
                <ActivityIndicator size="large" color="#40A2B2" />
              </View>
            ) : announcements.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
                {announcements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.AnnouncementID}
                    announcement={announcement}
                  />
                ))}
              </ScrollView>
            ) : (
              <View className="h-32 justify-center items-center bg-gray-50 rounded-xl">
                <Text className="text-gray-500">
                  No announcements available
                </Text>
              </View>
            )}
          </View>

          {/* Menu Items section */}
          <View>
            <Text className="text-xl font-bold text-[#111B47] mb-4">
              Services
            </Text>
            {menuItems.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  className="bg-[#40A2B2] rounded-2xl p-4 mb-4 flex-row items-center justify-between"
                  onPress={() => handleItemPress(item, index)}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="bg-white w-12 h-12 rounded-full items-center justify-center mr-4">
                      <Image
                        source={item.icon}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-white text-lg">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-white opacity-80">
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  {item.isExpandable && (
                    <Animated.View
                      style={{
                        transform: [{ rotate: rotation }],
                      }}
                    >
                      <Ionicons name="chevron-down" size={24} color="white" />
                    </Animated.View>
                  )}
                </TouchableOpacity>

                {/* Sub-items */}
                {item.isExpandable && expandedItem === index && (
                  <View className="mb-4">
                    {item.subItems.map((subItem, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        className="bg-white border border-[#40A2B2] rounded-xl p-4 mb-2 ml-6"
                        onPress={() => router.push(subItem.route)}
                      >
                        <Text className="font-semibold text-[#40A2B2] text-lg">
                          {subItem.title}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {subItem.subtitle}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <NotificationOverlay
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />
    </SafeAreaView>
  );
};

export default Home;

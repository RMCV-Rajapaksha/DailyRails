import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { useRouter } from "expo-router";

function LostAndFound() {
  const [activeTab, setActiveTab] = useState("lost");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === "lost" ? "/items/lost" : "/items/found";
      const response = await axios.get(`${API_URL}${endpoint}`);
      setItems(response.data.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = (item) => (
    <View
      key={item.ItemID}
      className="bg-white p-4 mb-3 rounded-lg border border-gray-200"
    >
      <Text className="text-lg font-semibold text-[#111B47] mb-1">
        {item.Title}
      </Text>
      <Text className="text-gray-600 mb-2">{item.Description}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-[#40A2B2]">{item.ItemType}</Text>
        {item.ContactNo && (
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => {
              /* Handle contact */
            }}
          >
            <Ionicons name="call" size={16} color="#40A2B2" />
            <Text className="text-[#40A2B2] ml-1">{item.ContactNo}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header with Back Button */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="chevron-back" size={24} color="#111B47" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-[#111B47] ml-2">
            Lost and Found
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2"
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tab Navigation */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 py-2 ${
              activeTab === "lost"
                ? "border-b-2 border-[#40A2B2]"
                : "border-b border-gray-200"
            }`}
            onPress={() => setActiveTab("lost")}
          >
            <Text
              className={`text-center ${
                activeTab === "lost" ? "text-[#40A2B2]" : "text-gray-500"
              }`}
            >
              Lost Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 ${
              activeTab === "found"
                ? "border-b-2 border-[#40A2B2]"
                : "border-b border-gray-200"
            }`}
            onPress={() => setActiveTab("found")}
          >
            <Text
              className={`text-center ${
                activeTab === "found" ? "text-[#40A2B2]" : "text-gray-500"
              }`}
            >
              Found Items
            </Text>
          </TouchableOpacity>
        </View>

        {/* Items List */}
        {loading ? (
          <ActivityIndicator size="large" color="#40A2B2" className="mt-4" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredItems.length > 0 ? (
              filteredItems.map(renderItem)
            ) : (
              <Text className="text-center text-gray-500 mt-4">
                No {activeTab} items found
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default LostAndFound;

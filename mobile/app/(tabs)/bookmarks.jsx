import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Bookmarks = () => {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState([]);

  const loadBookmarks = async () => {
    try {
      const savedBookmarks = await AsyncStorage.getItem("trainBookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
      Alert.alert("Error", "Failed to load bookmarks");
    }
  };

  const removeBookmark = async (trainId) => {
    try {
      const updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark.TrainID !== trainId
      );
      await AsyncStorage.setItem(
        "trainBookmarks",
        JSON.stringify(updatedBookmarks)
      );
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error removing bookmark:", error);
      Alert.alert("Error", "Failed to remove bookmark");
    }
  };

  // Replace useEffect with useFocusEffect
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-[#111B47]">
          Bookmarked Trains
        </Text>
      </View>

      {bookmarks.length === 0 ? (
        <View className="flex-1 justify-center items-center p-4">
          <Ionicons name="bookmark-outline" size={64} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg mt-4 text-center">
            No bookmarked trains yet
          </Text>
          <Text className="text-gray-400 text-sm mt-2 text-center">
            Add trains to your bookmarks for quick access
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.TrainID}
          className="p-4"
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100"
              onPress={() => {
                router.push({
                  pathname: "/map",
                  params: { trainId: item.TrainID },
                });
              }}
            >
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-semibold text-[#111B47]">
                    {item.Name}
                  </Text>
                  <Text className="text-[#40A2B2] text-sm">
                    ID: {item.TrainID}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {item.StartStations} → {item.EndStations}
                  </Text>
                </View>
                <TouchableOpacity
                  className="p-2"
                  onPress={() => removeBookmark(item.TrainID)}
                >
                  <Ionicons name="trash-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Bookmarks;

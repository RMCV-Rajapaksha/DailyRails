import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router"; // Import useRouter
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { icons, images } from "../../constants";

const { width, height } = Dimensions.get("window");

// Updated menuItems with route information
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
    subtitle: "Track your live location",
    route: "/(pages)/schedule",
  },
  {
    icon: icons.booking,
    title: "Ticket Booking",
    subtitle: "Track your live location",
    route: "/(pages)/booking",
  },
  {
    icon: icons.lostAndFound,
    title: "Lost and Found items",
    subtitle: "Track your live location",
    route: "/(pages)/lost-and-found",
  },
  {
    icon: icons.contact,
    title: "Contact Us",
    subtitle: "Track your live location",
    route: "/(pages)/contact-us",
  },
];

// ... existing imports ...

// Add offers data
const offers = [
  {
    id: 1,
    title: "Special Discount",
    description: "Get 20% off on weekend tickets",
    image: images.offer1, // Add these images to your constants
    bgColor: "#FFE4E1",
  },
  {
    id: 2,
    title: "Student Offer",
    description: "Special rates for students",
    image: images.offer2,
    bgColor: "#E0FFFF",
  },
  {
    id: 3,
    title: "Family Package",
    description: "Travel together & save more",
    image: images.offer3,
    bgColor: "#F0FFF0",
  },
];

const Home = () => {
  const router = useRouter();

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
            style={{
              width: "100%",
              height: 120,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Logo section */}
          <View className="flex-row items-center justify-center mb-6">
            <View className="items-center">
              <Image
                source={images.logo}
                style={{ height: height * 0.1, aspectRatio: 1 }}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Offers section */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-[#111B47] mb-4">
              Special Offers
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </ScrollView>
          </View>

          {/* Menu Items section */}
          <View>
            <Text className="text-xl font-bold text-[#111B47] mb-4">
              Services
            </Text>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="bg-[#40A2B2] rounded-2xl p-4 mb-4 flex-row items-center"
                onPress={() => router.push(item.route)}
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
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
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'; // Import useRouter
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { icons, images } from '../../constants';

const { width, height } = Dimensions.get('window');

// Updated menuItems with route information
const menuItems = [
  { 
    icon: icons.map, 
    title: 'Map', 
    subtitle: 'Track your live location',
    route: '/(pages)/map'
  },
  { 
    icon: icons.schedule, 
    title: 'Train Schedule', 
    subtitle: 'Track your live location',
    route: '/(pages)/schedule'
  },
  { 
    icon: icons.booking, 
    title: 'Ticket Booking', 
    subtitle: 'Track your live location',
    route: '/(pages)/booking'
  },
  { 
    icon: icons.lostAndFound, 
    title: 'Lost and Found items', 
    subtitle: 'Track your live location',
    route: '/(pages)/lost-and-found'
  },
  // { 
  //   icon: icons.bookmark, 
  //   title: 'Bookmarks', 
  //   subtitle: 'Track your live location',
  //   route: '/(tabs)/bookmarks' // This goes to the bookmarks tab
  // },
  { 
    icon: icons.contact, 
    title: 'Contact Us', 
    subtitle: 'Track your live location',
    route: '/(pages)/contact-us'
  },
];

const Home = () => {
  const router = useRouter(); // Initialize router

  return (
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center justify-center mb-6">
            {/* <TouchableOpacity className="w-10 h-10 rounded-full bg-[#40A2B2] items-center justify-center">
              <View className="w-5 h-5 bg-[#40A2B2] rounded-full" />
            </TouchableOpacity> */}
            <View className="items-center">
              <Image 
                source={images.logo}
                style={{ height: height*0.1, aspectRatio: 1}}
                resizeMode='contain'
              />
            </View>
            {/* <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-[#40A2B2] items-center justify-center"
              onPress={() => router.push('/(tabs)/notifications')}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#40A2B2] rounded-[4px] p-4 mb-4 flex-row items-center"
              onPress={() => router.push(item.route)}
            >
              <View className="bg-[#40A2B2] w-10 h-10 rounded-full items-center justify-center mr-4">
                <Image 
                  source={item.icon}
                  style={{ width: 24, height: 24}}
                />
              </View>
              <View>
                <Text className="font-bold text-[#111B47]">{item.title}</Text>
                <Text className="text-xs text-[#111B47]">{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
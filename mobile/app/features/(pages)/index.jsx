import { View, Text, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../../shared/constants';

const menuItems = [
  { icon: icons.map, title: 'Map', subtitle: 'Track your live location' },
  { icon: icons.schedule, title: 'Train Schedule', subtitle: 'Track your live location' },
  { icon: icons.booking, title: 'Ticket Booking', subtitle: 'Track your live location' },
  { icon: icons.lostAndFound, title: 'Lost and Found items', subtitle: 'Track your live location' },
  { icon: icons.bookmark, title: 'Bookmarks', subtitle: 'Track your live location' },
  { icon: icons.contact, title: 'Contact Us', subtitle: 'Track your live location' },
];

export default function App(){
  return (
    <>
    <SafeAreaView className="flex-1 bg-[#ffffff]">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#40A2B2] items-center justify-center">
              <View className="w-5 h-5 bg-[#40A2B2] rounded-full" />
            </TouchableOpacity>
            <View className="items-center">
              <Ionicons name="train-outline" size={24} color="black" />
              <Text className="font-bold text-[#111B47]">DAILYRAILS</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-[#40A2B2] items-center justify-center">
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-[#40A2B2] rounded-lg p-4 mb-4 flex-row items-center"
            >
              <View className="bg-[#40A2B2] w-10 h-10 rounded-full items-center justify-center mr-4">
                <Image 
                  source={item.icon}
                  style={{ width: 24, height: 24}}

                />
                {/* <Ionicons name={item.icon} size={24} color="white" /> */}
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
    </>
  ) 
}



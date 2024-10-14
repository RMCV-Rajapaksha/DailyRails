import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../../shared/constants';


const { width, height } = Dimensions.get('window');


export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-between flex-1 p-6">
        <View className="items-center mt-12">
          <View className="flex-row items-center">
            <Image 
              source={images.logo} 
              style={{ height: height*0.02,aspectRatio: 1}}
            />
          </View>
          <Text className="mt-2 text-sm text-gray-600">Navigate your day, one train at a time</Text>
        </View>
        
        <View className="relative w-full aspect-[2/1]">
          <View className="absolute top-0 left-0 right-0 bg-teal-100 h-1/2 rounded-t-3xl" />
          <View className="absolute bottom-0 left-0 right-0 bg-white h-1/2" />
          <Image 
            source={images.train} 
            style={{ height: height*0.02,aspectRatio: 1}}
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
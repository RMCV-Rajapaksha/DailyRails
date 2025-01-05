import React from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

const SplashScreen = () => {
  const { width, height } = Dimensions.get('window');
  const isSmallDevice = height < 700;
  
  // Calculate logo size
  const logoSize = Math.min(height * 0.15, width * 0.3);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center">
        {/* Logo and tagline container */}
        <View className="w-full items-center pt-[5%] px-5">
          <Image
            source={images.logo}
            className="aspect-square"
            style={{
              height: logoSize,
              width: logoSize,
            }}
            resizeMode="contain"
          />
          <Text
            className={`font-bold text-center px-5 text-primary mt-3 
              ${isSmallDevice ? 'text-lg' : 'text-2xl'}`}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            <Text className="text-[#111B47] ">Navigate your day, one train at a time</Text>
          </Text>
        </View>

        {/* Train image container with flex to take remaining space */}
        <View className="flex-1 w-full overflow-hidden">
          <Image
            source={images.train}
            className="w-full"
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 0.93,
            }}
            resizeMode="contain"
          />
          
          {/* Spinner container */}
          <View className="w-full items-center pb-4 absolute bottom-3">
            <ActivityIndicator size="large" color="#41A3B3" />
            <Text className="text-[#111B47] mt-2">Loading...</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
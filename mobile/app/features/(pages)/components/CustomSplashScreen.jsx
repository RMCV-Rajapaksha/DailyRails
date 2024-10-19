import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../../shared/constants';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-between flex-1 p-6">
        
        {/* Logo and tagline */}
        <View className="items-center mt-8">
          <Image
            source={images.logo}
            style={{ height: height * 0.2, aspectRatio: 1 }} 
            resizeMode="contain"
          />
          <Text className="mb-6 text-xl font-bold text-primary">
            Navigate your day, one train at a time
          </Text>
        </View>

        <View className="flex-1">
      <Image
        source={images.train} 
        style={{ 
          width: width, 
          height: height * 0.5, }}
        resizeMode="cover" 
      />
    </View>

      </View>
    </SafeAreaView>
  );
}

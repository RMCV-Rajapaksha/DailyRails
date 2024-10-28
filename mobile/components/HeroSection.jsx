import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { styled } from 'nativewind';
import { images } from '../constants';

const { width, height } = Dimensions.get('window');
const StyledView = styled(View);
const StyledText = styled(Text);

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);
  
  const pictures = [
    images.train_01,
    images.train_02,
    images.train_03,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pictures.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim, pictures.length]);

  return (
    <StyledView className="w-full h-48">
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <ImageBackground
          source={pictures[currentImageIndex]}
          className="w-full h-full"
          resizeMode="cover"
        >
          <View className="flex-1 items-center justify-center bg-black/30">
            <StyledText className="text-2xl font-bold text-white">
              Book Your Train Ticket
            </StyledText>
          </View>
        </ImageBackground>
      </Animated.View>
    </StyledView>
  );
};

export default HeroSection;
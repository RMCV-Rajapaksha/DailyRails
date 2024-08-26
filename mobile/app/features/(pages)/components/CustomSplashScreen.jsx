import React from 'react';
import { View, Text, Image, ActivityIndicator, Animated } from 'react-native';
import { styled } from 'nativewind';
import { useEffect } from 'react';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const AnimatedStyledView = Animated.createAnimatedComponent(StyledView);
const StyledActivityIndicator = styled(ActivityIndicator)

const CustomSplash = () => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, []);
  return (
    <StyledView className="items-center justify-center flex-1 bg-white">
      <AnimatedStyledView style={{opacity: fadeAnim}}>
        <StyledImage 
          source={require('./assets/logo.png')} 
          className="w-24 h-24 "
        />
        <StyledText className="text-base text-[#1a3c4d] mb-8">
          Navigate your day, one train at a time
        </StyledText>
        <StyledImage 
          source={require('./assets/train.png')} 
          className="w-4/5 h-48"
        />
      </AnimatedStyledView>
      <StyledActivityIndicator size="large" color="#1a3c4d" className="mt-5" />
    </StyledView>
  );
};

export default CustomSplash;
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary', // 'primary' or 'link'
  className = '', 
  textClassName = '' 
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return 'w-full bg-[#41A3B3] py-4 rounded-lg ' + className;
      case 'link':
        return className;
      default:
        return className;
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white text-center text-lg font-semibold ' + textClassName;
      case 'link':
        return 'text-[#41A3B3] text-base font-semibold ' + textClassName;
      default:
        return textClassName;
    }
  };

  return (
    <TouchableOpacity
      className={getButtonStyles()}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text className={getTextStyles()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
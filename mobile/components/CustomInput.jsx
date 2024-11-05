import React from 'react';
import { View, Text, TextInput } from 'react-native';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  className = '',
  containerClassName = '',
  spacing = 'space-y-2' // New prop for controlling label-input spacing
}) => {
  return (
    <View className={`${spacing} ${containerClassName}`}>
      <Text className="text-gray-600 text-base uppercase tracking-wide">
        {label}
      </Text>
      <TextInput
        className={`w-full border-b border-gray-300 pb-2 text-base ${className}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;
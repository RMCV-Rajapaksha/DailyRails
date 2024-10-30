import { Text, TouchableOpacity } from 'react-native';

export const CustomButton = ({ 
  title, 
  onPress, 
  variant = 'primary' 
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`p-3 rounded-md w-full ${
      variant === 'primary' 
        ? 'bg-[#4DA1A9]' 
        : variant === 'secondary' 
          ? 'bg-white' 
          : 'bg-transparent'
    }`}
  >
    <Text 
      className={`text-center text-base font-medium ${
        variant === 'secondary' ? 'text-gray-700' : 'text-white'
      }`}
    >
      {title}
    </Text>
  </TouchableOpacity>
);
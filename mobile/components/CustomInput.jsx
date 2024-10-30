import { View, Text, TextInput } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

export const CustomInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  toggleSecureEntry,
  ...props
}) => (
  <View className="space-y-1">
    <Text className="text-sm font-medium text-gray-700">
      {label}
    </Text>
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className="w-full p-2 border border-gray-300 rounded-md"
        {...props}
      />
      {toggleSecureEntry && (
        <TouchableOpacity 
          onPress={toggleSecureEntry}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          {secureTextEntry ? (
            <Eye size={20} color="#666" />
          ) : (
            <EyeOff size={20} color="#666" />
          )}
        </TouchableOpacity>
      )}
    </View>
  </View>
);
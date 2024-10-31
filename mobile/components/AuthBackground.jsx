import { ImageBackground, View } from 'react-native';
import { images } from '../constants';

export const AuthBackground = ({ children }) => (
  <ImageBackground
    source={images.auth_background}
    className="w-full h-full"
  >
    <View className="flex-1 bg-black/30">
      {children}
    </View>
  </ImageBackground>
);
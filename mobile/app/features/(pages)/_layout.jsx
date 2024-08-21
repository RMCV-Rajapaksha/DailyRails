import { View, Text, Button ,ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from './components/CustomButton';

// const PageLayout = () => {
//   return (
//     <>
//       <SafeAreaView className="h-full">
//         <ScrollView>
//           <View className="flex justify-center items-center h-screen">
//             <Link href="./map" className='w-full flex justify-center items-center'>Go to Mao</Link>
//           </View>
//         </ScrollView>
//         <StatusBar style="auto" />
//       </SafeAreaView>
//     </>
//   )
// }

const PageLayout = ({ navigation }) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: true}} />
    </Stack>
  );
};

export default PageLayout;

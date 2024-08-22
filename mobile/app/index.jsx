import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App(){
  return (
    <>
      <SafeAreaView className="h-full">
          <View className="items-center ">
            <Link href="./features/(pages)" className='flex justify-center items-center text-blue-500'>Go to Home Page</Link>
          </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App(){
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="flex justify-center items-center h-screen">
            <Text className="text-xl text-justify">Home Page</Text>
            <Link href="./(map)" className='w-full flex justify-center items-center '>Go to Map</Link>
            <Link href="./(share-location)" className='w-full flex justify-center items-center'>Go to Share Location</Link>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



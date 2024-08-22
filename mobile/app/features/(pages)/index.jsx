import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App(){
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="flex justify-center items-center">
            <Text className="text-xl text-justify p-2">Home Page</Text>
            <Link href="./(map)" className=' flex justify-center items-center p-2 text-blue-500'>Go to Map</Link>
            <Link href="./(share-location)" className='flex justify-center items-center p-2 text-blue-500'>Go to Share Location</Link>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



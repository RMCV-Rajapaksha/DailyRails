import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App(){
  return (
    <>
      <SafeAreaView className="bg-blue-500">
        <ScrollView>
          <View className="flex justify-center items-center h-screen">
            <Link href="./features/(pages)" className='w-full flex justify-center items-center'>Go to Home Page</Link>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



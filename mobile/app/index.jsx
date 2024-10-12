import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomSplash from './features/(pages)/components/CustomSplashScreen';


export default function App(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  if (isLoading) {
    return (<><CustomSplash /></>);
  }
  return (
    <>
      <SafeAreaView className="h-full">
          <View className="items-center ">
            <Link href="./features/(pages)" className='flex items-center justify-center text-blue-500'>Go to Home Page</Link>
          </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



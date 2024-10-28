import { View, Text, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomSplash from '../components/CustomSplashScreen';
import CustomButton from '../components/CustomButton';


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
            <Text className='text-xl mt-8 font-bold'>Sign In and SignUp Page</Text>
            <Link href="/home" className='flex mt-20 items-center justify-center text-blue-500'>Go to Home Page</Link>
            {/* <CustomButton 
              title="Sign In" 
              handlePress={() => {router.push('/(pages)')}} 
              containerStyles="mt-20" 
              /> */}
          </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  ) 
}



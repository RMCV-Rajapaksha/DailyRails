import { View, Text } from 'react-native'
import React from 'react'

const AuthLayout = () => {
  return (
<>
  <Stack>
    <Stack.Screen 
      name="sign-in"
      options={{
      headerShown: false
        }}  
        />
      </Stack>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default AuthLayout
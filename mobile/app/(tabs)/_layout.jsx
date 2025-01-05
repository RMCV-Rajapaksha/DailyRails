import { Text, View, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: true, // Changed to true
        tabBarActiveTintColor: '#40A2B2',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          borderTopColor: '#232533',
          height: 84,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label font size
          fontFamily: 'pregular', // Match your font family
          marginTop: 2, // Space between icon and label
        },       
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabel: 'Home', // Added explicitly
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.home} 
              color={color}  
            />
          )
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          headerShown: false,
          tabBarLabel: 'Bookmarks', // Added explicitly
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.bookmark} 
              color={color} 
            />
          )
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarLabel: 'Notifications', // Added explicitly
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.notification} 
              color={color} 
            />
          )
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarLabel: 'Account', // Added explicitly
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.profile} 
              color={color} 
            />
          )
        }}
      />
    </Tabs>
    </>
  )
}

export default TabsLayout
import {  Text, View, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#40A2B2',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          borderTopColor: '#232533',
          height: 84,
            }      
          }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: 'false',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.home} 
              color={color} 
              name="Home" 
              focused={focused} 
            />
          )
        }}
      />
    <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          headerShown: 'false',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.bookmarks} 
              color={color} 
              name="Bookmarks" 
              focused={focused} 
            />
          )
        }}
      />
      <Tabs.Screen
      name="notifications"
      options={{
        title: 'Notifications',
        headerShown: 'false',
        tabBarIcon: ({color, focused}) => (
          <TabIcon 
            icon={icons.plus} 
            color={color} 
            name="Notifications" 
            focused={focused} 
          />
        )
      }}
    />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: 'false',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.profile} 
              color={color} 
              name="Account" 
              focused={focused} 
            />
          )
        }}
      />
    </Tabs>
    </>
  )
}

export default TabsLayout

import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../components/TabBar'

export default function TabLayout() {
  return (
   <Tabs
      tabBar={props=> <TabBar {...props} /> }
   >
       <Tabs.Screen name="home"
        options={{
          headerShown:false
        }}
       />
       <Tabs.Screen name="Reels"
         options={{
          headerShown:false
         }}
       />
       <Tabs.Screen name="Saved"
         options={{
          headerShown:false
         }}
       />

       <Tabs.Screen name="Profile"
         options={{
          headerShown:false
         }}
       />
   </Tabs>
  )
}
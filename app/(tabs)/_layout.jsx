import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TabBar from '../../components/TabBar';
import Debate from './../Debate';
import Live from './../Live';
import customDrawerContent from './../../components/customDrawerContent'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom Tabs Component
function TabLayout() {

  const navigation = useNavigation();

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'inflow', // Set the header title for the Home screen
          headerShown: true, // Show header for home screen
          headerTitleStyle: {
            color: 'blue', // Set the text color to blue
          },
          // below fuction will display (hamburger menu) to the header
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="Reels"
        options={{
          title: 'Reels', // Set the header title for the Reels screen
          headerShown: true, // Show header for Reels screen
          // below fuction will display (hamburger menu) to the header
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="Saved"
        options={{
          title: 'Saved', // Set the header title for the Saved screen
          headerShown: true, // Show header for Saved screen
            // below fuction will display (hamburger menu) to the header
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
        }}
      />


      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile', // Set the header title for the Profile screen
          headerShown: true, // Show header for Profile screen
            // below fuction will display (hamburger menu) to the header
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.openDrawer()}
              />
            ),
        }}
      />

    </Tabs>
  );
}

// Main Drawer Layout
export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Drawer.Navigator
     drawerContent={customDrawerContent}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f8f9fa',
          width: 250,
        },
        drawerActiveTintColor: '#47c7f5',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      {/* Drawer Screen for Tabs */}
      <Drawer.Screen
        name="Home"
        component={TabLayout}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false, // Hide the default drawer header
        }}
      />

      {/* Drawer Screen for Debate */}
      <Drawer.Screen
        name="Debate"
        component={Debate}
        options={{
          drawerLabel: 'Debate',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="videocam" size={size} color={color} />
          ),
          headerShown: true, // Show header for Debate screen
        }}
      />

      {/* Drawer Screen for Live */}
      <Drawer.Screen
        name="Live"
        component={Live}
        options={{
          drawerLabel: 'Live',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="videocam" size={size} color={color} />
          ),
          headerShown: true, // Show header for Live screen
        }}
      />
    </Drawer.Navigator>
    </GestureHandlerRootView>
  );
}

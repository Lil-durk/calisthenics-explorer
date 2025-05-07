import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'index') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Map',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ 
          title: 'Favorites',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerShown: false 
        }} 
      />
    </Tabs>
  );
}

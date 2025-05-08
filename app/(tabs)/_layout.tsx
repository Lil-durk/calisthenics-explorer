import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          if (route.name === 'index') {
            iconName = 'map';
          } else if (route.name === 'workout') {
            iconName = 'sports-gymnastics';
          } else if (route.name === 'community') {
            iconName = 'groups';
          } else {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
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
        name="workout" 
        options={{ 
          title: 'Workouts',
          headerShown: false 
        }} 
      />
      <Tabs.Screen 
        name="community" 
        options={{ 
          title: 'Community',
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
    </Tabs>
  );
}

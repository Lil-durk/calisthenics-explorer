import React, { useState, memo } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { styled } from 'nativewind';

// Types
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

interface SectionHeaderProps {
  title: string;
  onMorePress?: () => void;
}

interface BadgeItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

// Reusable Components
const CircularProgress = memo(({ percentage, size = 60, strokeWidth = 6 }: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E0E0E0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#1BA7EB"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
});

const SectionHeader = memo(({ title, onMorePress }: SectionHeaderProps) => (
  <View className="flex-row justify-between items-center px-4 py-2">
    <Text className="text-lg font-semibold text-gray-800">{title}</Text>
    {onMorePress && (
      <TouchableOpacity className="flex-row items-center" onPress={onMorePress}>
        <Text className="text-blue-500 mr-1">More</Text>
        <MaterialIcons name="chevron-right" size={20} color="#1BA7EB" />
      </TouchableOpacity>
    )}
  </View>
));

const BadgeItem = memo(({ icon, label, onPress }: BadgeItemProps) => (
  <TouchableOpacity className="items-center p-4" onPress={onPress}>
    <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-2">
      <MaterialIcons name={icon as any} size={30} color="#1BA7EB" />
    </View>
    <Text className="text-sm text-gray-600 text-center">{label}</Text>
  </TouchableOpacity>
));

// Utility Functions
const showNotImplementedAlert = () => {
  Alert.alert(
    "Page doesn't exist",
    "This feature is not implemented yet.",
    [{ text: "OK" }]
  );
};

// Main Component
export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  return (
    <View className="flex-1 relative">
      <ScrollView className="flex-1 bg-gray-100">
        <LinearGradient
          colors={['#1BA7EB', '#8EE0FF']}
          className="h-64 w-full"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View className="absolute top-9 right-5 z-10">
            <TouchableOpacity 
              className="p-2.5 bg-white/20 rounded-full shadow-lg"
              onPress={showNotImplementedAlert}
            >
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-0 left-0 right-0 items-center">
            <Image
              source={require('../../assets/images/profile-avatar.png')}
              className="w-32 h-32"
              resizeMode="contain"
            />
          </View>

          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center space-x-4">
            <TouchableOpacity 
              className="bg-white/20 px-6 py-2 rounded-full"
              onPress={showNotImplementedAlert}
            >
              <Text className="text-white font-medium">Add Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-white/20 px-6 py-2 rounded-full"
              onPress={showNotImplementedAlert}
            >
              <Text className="text-white font-medium">My Account</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View className="bg-white py-4">
          <View className="flex-row justify-center items-center">
            <TouchableOpacity className="items-center px-8" onPress={showNotImplementedAlert}>
              <Text className="text-xl font-bold text-gray-800">245</Text>
              <Text className="text-sm text-gray-600">Followers</Text>
            </TouchableOpacity>
            <View className="h-8 w-px bg-gray-200" />
            <TouchableOpacity className="items-center px-8" onPress={showNotImplementedAlert}>
              <Text className="text-xl font-bold text-gray-800">128</Text>
              <Text className="text-sm text-gray-600">Following</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-4">
          <View className="h-px bg-gray-200" />
          <SectionHeader title="Progress" onMorePress={showNotImplementedAlert} />
          
          <View className="px-4 py-2">
            <View className="h-2 bg-gray-200 rounded-full">
              <View className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-blue-500 font-semibold">65%</Text>
              <Text className="text-gray-600">Level 3</Text>
            </View>
          </View>

          <View className="flex-row flex-wrap justify-between px-4 py-4">
            {[
              { percentage: 85, label: 'Arms' },
              { percentage: 70, label: 'Abs' },
              { percentage: 65, label: 'Legs' },
              { percentage: 60, label: 'Shoulders' }
            ].map((item, index) => (
              <TouchableOpacity key={index} className="w-1/2 items-center mb-4" onPress={showNotImplementedAlert}>
                <View className="relative items-center justify-center">
                  <CircularProgress percentage={item.percentage} />
                  <Text className="absolute text-sm font-semibold text-gray-800">{item.percentage}%</Text>
                </View>
                <Text className="text-sm text-gray-600 mt-2">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mt-4">
          <View className="h-px bg-gray-200" />
          <SectionHeader title="Badges" onMorePress={showNotImplementedAlert} />

          <View className="flex-row flex-wrap justify-between px-4 py-4">
            {[
              { icon: 'fitness-center', label: 'First Workout' },
              { icon: 'star', label: '5 Day Streak' },
              { icon: 'emoji-events', label: 'Pull-up Master' },
              { icon: 'local-fire-department', label: 'Workout Warrior' }
            ].map((badge, index) => (
              <BadgeItem
                key={index}
                icon={badge.icon}
                label={badge.label}
                onPress={showNotImplementedAlert}
              />
            ))}
          </View>
        </View>

        <View className="mt-4">
          <View className="h-px bg-gray-200" />
          <SectionHeader title="Special Content" />
          
          <TouchableOpacity 
            className="flex-row items-center justify-center p-4 bg-red-50 mx-4 my-2 rounded-lg"
            onPress={handleYoutubePress}
          >
            <MaterialIcons name="play-circle-filled" size={40} color="#FF0000" />
            <Text className="text-red-600 ml-2 font-medium">Click for a special surprise!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

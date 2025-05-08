import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress = ({ percentage, size = 60, strokeWidth = 6 }: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      {/* Background Circle */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E0E0E0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress Circle */}
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
};

const showNotImplementedAlert = () => {
  Alert.alert(
    "Page doesn't exist",
    "This feature is not implemented yet.",
    [{ text: "OK" }]
  );
};

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#1BA7EB', '#8EE0FF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {/* Settings Button */}
          <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.settingsButton} onPress={showNotImplementedAlert}>
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/profile-avatar.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={showNotImplementedAlert}>
              <Text style={styles.buttonText}>Add Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showNotImplementedAlert}>
              <Text style={styles.buttonText}>My Account</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Profile Info Container */}
        <View style={styles.profileInfoContainer}>
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={showNotImplementedAlert}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <TouchableOpacity style={styles.statItem} onPress={showNotImplementedAlert}>
              <Text style={styles.statNumber}>128</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Section */}
        <View style={[styles.progressContainer, styles.noTopMargin]}>
          <View style={styles.horizontalDivider} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress</Text>
            <TouchableOpacity style={styles.moreButton} onPress={showNotImplementedAlert}>
              <Text style={styles.moreButtonText}>More</Text>
              <MaterialIcons name="chevron-right" size={20} color="#1BA7EB" />
            </TouchableOpacity>
          </View>
          
          {/* Global Progress Bar */}
          <View style={styles.globalProgressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressPercentage}>65%</Text>
              <Text style={styles.progressText}>Level 3</Text>
            </View>
          </View>

          <View style={styles.progressGrid}>
            <TouchableOpacity style={styles.progressItem} onPress={showNotImplementedAlert}>
              <View style={styles.circularProgressContainer}>
                <CircularProgress percentage={85} />
                <Text style={styles.progressNumber}>85%</Text>
              </View>
              <Text style={styles.progressLabel}>Arms</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.progressItem} onPress={showNotImplementedAlert}>
              <View style={styles.circularProgressContainer}>
                <CircularProgress percentage={70} />
                <Text style={styles.progressNumber}>70%</Text>
              </View>
              <Text style={styles.progressLabel}>Abs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.progressItem} onPress={showNotImplementedAlert}>
              <View style={styles.circularProgressContainer}>
                <CircularProgress percentage={65} />
                <Text style={styles.progressNumber}>65%</Text>
              </View>
              <Text style={styles.progressLabel}>Legs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.progressItem} onPress={showNotImplementedAlert}>
              <View style={styles.circularProgressContainer}>
                <CircularProgress percentage={60} />
                <Text style={styles.progressNumber}>60%</Text>
              </View>
              <Text style={styles.progressLabel}>Shoulders</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Badges Section */}
        <View style={[styles.progressContainer, styles.noTopMargin]}>
          <View style={styles.horizontalDivider} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Badges</Text>
            <TouchableOpacity style={styles.moreButton} onPress={showNotImplementedAlert}>
              <Text style={styles.moreButtonText}>More</Text>
              <MaterialIcons name="chevron-right" size={20} color="#1BA7EB" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgesGrid}>
            <TouchableOpacity style={styles.badgeItem} onPress={showNotImplementedAlert}>
              <View style={styles.badgeIcon}>
                <MaterialIcons name="fitness-center" size={30} color="#1BA7EB" />
              </View>
              <Text style={styles.badgeLabel}>First Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.badgeItem} onPress={showNotImplementedAlert}>
              <View style={styles.badgeIcon}>
                <MaterialIcons name="star" size={30} color="#1BA7EB" />
              </View>
              <Text style={styles.badgeLabel}>5 Day Streak</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.badgeItem} onPress={showNotImplementedAlert}>
              <View style={styles.badgeIcon}>
                <MaterialIcons name="emoji-events" size={30} color="#1BA7EB" />
              </View>
              <Text style={styles.badgeLabel}>Pull-up Master</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.badgeItem} onPress={showNotImplementedAlert}>
              <View style={styles.badgeIcon}>
                <MaterialIcons name="local-fire-department" size={30} color="#1BA7EB" />
              </View>
              <Text style={styles.badgeLabel}>Workout Warrior</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* YouTube Section */}
        <View style={[styles.progressContainer, styles.noTopMargin]}>
          <View style={styles.horizontalDivider} />
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Content</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.youtubeContainer}
            onPress={handleYoutubePress}
          >
            <MaterialIcons name="play-circle-filled" size={40} color="#FF0000" />
            <Text style={styles.youtubeText}>Click for a special surprise!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradient: {
    height: 250,
    width: '100%',
  },
  settingsContainer: {
    position: 'absolute',
    top: 35,
    right: 20,
    zIndex: 10,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 25,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  profileInfoContainer: {
    backgroundColor: 'white',
    marginTop: 0,
    padding: 20,
    paddingBottom: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1BA7EB',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  progressContainer: {
    backgroundColor: 'white',
    marginTop: 0,
    padding: 20,
  },
  noTopMargin: {
    marginTop: 0,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  circularProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressNumber: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1BA7EB',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  globalProgressContainer: {
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1BA7EB',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1BA7EB',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#1BA7EB',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  badgeItem: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(27, 167, 235, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  youtubeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  youtubeText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

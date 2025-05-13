import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="person" size={24} color="black" />
        <TextInput 
          style={styles.searchBar} 
          placeholder="Search workouts..." 
        />
        <MaterialIcons name="chat" size={24} color="black" />
      </View>
      
      <LinearGradient 
        colors={['#1BA7EB', '#8EE0FF']}
        style={styles.spacer} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {['Chest', 'Arms', 'Legs', 'Abs', 'Core'].map((filter) => (
          <TouchableOpacity key={filter} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: 5,
    height: 40,
    borderWidth: 1,
    borderColor: '#1BA7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
    width: '120%',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
    marginVertical: 10,
  },
});

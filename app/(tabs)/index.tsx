import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { fetchCalisthenicsParks } from '../services/overpassApi';
import { CalisthenicsPark } from '../types/park';
import { clusterClusters, clusterParks } from '../utils/clustering';

// Eindhoven coordinates
const EINDHOVEN = {
  latitude: 51.4416,
  longitude: 5.4697,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

interface Cluster {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  parks: CalisthenicsPark[];
}

const renderMarker = (park: CalisthenicsPark) => (
  <Marker
    key={park.id}
    coordinate={park.location}
    title={park.name}
    description={park.description}
  >
    <Image
      source={require('../../assets/images/IconopMap.png')}
      style={{ width: 40, height: 35, resizeMode: 'contain' }}
    />
  </Marker>
);

const renderCluster = (cluster: Cluster, onPress: () => void) => (
  <Marker
    key={cluster.id}
    coordinate={cluster.location}
    onPress={onPress}
  >
    <ImageBackground
      source={require('../../assets/images/ClusterMapIcon.png')}
      style={{
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{ resizeMode: 'contain' }}
    >
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 5, // Adjust this to center the number vertically
        }}
      >
        {cluster.parks.length}
      </Text>
    </ImageBackground>
  </Marker>
);

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [parks, setParks] = useState<CalisthenicsPark[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [zoomLevel, setZoomLevel] = useState(14);

  const onRegionChangeComplete = useCallback(async (region: Region) => {
    console.log('Region changed:', region);
    setLoading(true);
    try {
      const bounds = {
        south: region.latitude - region.latitudeDelta / 2,
        north: region.latitude + region.latitudeDelta / 2,
        west: region.longitude - region.longitudeDelta / 2,
        east: region.longitude + region.longitudeDelta / 2,
      };
      
      // Calculate zoom level based on latitudeDelta
      const newZoomLevel = Math.round(Math.log(360 / region.latitudeDelta) / Math.LN2);
      setZoomLevel(newZoomLevel);
      
      console.log('Calculated bounds:', bounds);
      const newParks = await fetchCalisthenicsParks(bounds);
      console.log('Fetched parks:', newParks);
      setParks(newParks);
    } catch (error) {
      console.error('Error in onRegionChangeComplete:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch when component mounts
  React.useEffect(() => {
    console.log('Component mounted, fetching initial parks...');
    onRegionChangeComplete(EINDHOVEN);
  }, [onRegionChangeComplete]);

  const clusters = clusterParks(parks, zoomLevel);
  let displayClusters = clusters;
  if (zoomLevel <= 14 && clusters.length > 10) {
    displayClusters = clusterClusters(clusters, 10);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={EINDHOVEN}
        showsUserLocation
        showsMyLocationButton
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {zoomLevel > 14
          ? parks.map(renderMarker)
          : (
              displayClusters.length === 1 && displayClusters[0].parks.length === 1
                ? renderMarker(displayClusters[0].parks[0])
                : displayClusters.map(cluster => renderCluster(cluster, () => setSelectedCluster(cluster)))
            )
        }
      </MapView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <Modal
        visible={selectedCluster !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedCluster(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedCluster?.parks.length} Parks in this area
            </Text>
            <FlatList
              data={selectedCluster?.parks}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.parkItem}
                  onPress={() => {
                    setSelectedCluster(null);
                    mapRef.current?.animateToRegion({
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    });
                  }}
                >
                  <Text style={styles.parkName}>{item.name}</Text>
                  <Text style={styles.parkDescription}>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedCluster(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  markerText: {
    fontSize: 20,
  },
  clusterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cluster: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  clusterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  parkItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parkName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  parkDescription: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
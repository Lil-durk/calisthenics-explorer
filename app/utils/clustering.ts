import { CalisthenicsPark } from '../types/park';

export interface Cluster {
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  parks: CalisthenicsPark[];
}

export function clusterParks(parks: CalisthenicsPark[], zoomLevel: number): Cluster[] {
  if (zoomLevel > 14) {
    // If zoomed in enough, return individual parks as single-item clusters
    return parks.map(park => ({
      id: park.id,
      location: park.location,
      parks: [park],
    }));
  }

  const clusters: Cluster[] = [];
  const gridSize = 0.01; // Adjust this value to control cluster size

  parks.forEach(park => {
    const gridX = Math.floor(park.location.longitude / gridSize);
    const gridY = Math.floor(park.location.latitude / gridSize);
    const clusterId = `${gridX}-${gridY}`;

    const existingCluster = clusters.find(c => c.id === clusterId);
    if (existingCluster) {
      existingCluster.parks.push(park);
    } else {
      clusters.push({
        id: clusterId,
        location: park.location,
        parks: [park],
      });
    }
  });

  return clusters;
}

export function clusterClusters(
  clusters: Cluster[],
  maxClusters: number,
  recursionDepth = 0,
  gridSize = 0.05
): Cluster[] {
  if (clusters.length <= maxClusters || recursionDepth > 10) return clusters;

  const superClusters: Cluster[] = [];

  clusters.forEach(cluster => {
    const gridX = Math.floor(cluster.location.longitude / gridSize);
    const gridY = Math.floor(cluster.location.latitude / gridSize);
    const superClusterId = `${gridX}-${gridY}`;

    const existing = superClusters.find(c => c.id === superClusterId);
    if (existing) {
      existing.parks.push(...cluster.parks);
    } else {
      superClusters.push({
        id: superClusterId,
        location: cluster.location,
        parks: [...cluster.parks],
      });
    }
  });

  // Increase grid size for next recursion to force more merging
  return clusterClusters(superClusters, maxClusters, recursionDepth + 1, gridSize * 1.5);
} 
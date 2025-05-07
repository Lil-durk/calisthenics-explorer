import { CalisthenicsPark } from '../types/park';

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

// Eindhoven bounding box
const EINDHOVEN_BOUNDS = {
  south: 51.38,
  north: 51.48,
  west: 5.40,
  east: 5.50,
};

export async function fetchCalisthenicsParks(
  bounds: {
    south: number;
    north: number;
    west: number;
    east: number;
  }
): Promise<CalisthenicsPark[]> {
  console.log('Fetching parks with bounds:', bounds);
  
  const query = `
    [out:json][timeout:25];
    area[name="Eindhoven"][admin_level="8"]->.eindhoven;
    (
      node["leisure"="fitness_station"](area.eindhoven);
      node["sport"="calisthenics"](area.eindhoven);
      node["leisure"="fitness_station"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
      node["sport"="calisthenics"](${bounds.south},${bounds.west},${bounds.north},${bounds.east});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    console.log('Sending request to Overpass API...');
    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Received data:', data);
    
    if (!data.elements || !Array.isArray(data.elements)) {
      console.log('No elements found in response');
      return [];
    }

    const parks = data.elements.map((element: any) => ({
      id: element.id.toString(),
      name: element.tags.name || 'Calisthenics Park',
      location: {
        latitude: element.lat,
        longitude: element.lon,
      },
      description: element.tags.description || 'Outdoor fitness equipment',
      equipment: element.tags.equipment ? element.tags.equipment.split(';') : [],
    }));

    console.log('Processed parks:', parks);
    return parks;
  } catch (error) {
    console.error('Error fetching calisthenics parks:', error);
    return [];
  }
} 
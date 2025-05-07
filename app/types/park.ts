export interface CalisthenicsPark {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description?: string;
  equipment?: string[];
  rating?: number;
  images?: string[];
} 
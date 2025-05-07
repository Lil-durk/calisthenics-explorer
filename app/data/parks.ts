import { CalisthenicsPark } from '../types/park';

export const calisthenicsParks: CalisthenicsPark[] = [
  {
    id: '1',
    name: 'Calisthenics Park Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
    },
    description: 'Modern calisthenics park with various equipment',
    equipment: ['Pull-up bars', 'Parallel bars', 'Monkey bars', 'Rings'],
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Rotterdam Calisthenics',
    location: {
      latitude: 51.9244,
      longitude: 4.4777,
    },
    description: 'Outdoor fitness park in Rotterdam',
    equipment: ['Pull-up bars', 'Dip bars', 'Climbing frame'],
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Utrecht Calisthenics Spot',
    location: {
      latitude: 52.0907,
      longitude: 5.1214,
    },
    description: 'Popular calisthenics location in Utrecht',
    equipment: ['Pull-up bars', 'Rings', 'Monkey bars'],
    rating: 4.0,
  },
]; 
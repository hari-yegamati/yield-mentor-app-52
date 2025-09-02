import { Crop, Product, User, PredictionResult } from '@/types';

// Import images
import maizeImg from '@/assets/maize.jpg';
import onionImg from '@/assets/onion.jpg';
import wheatImg from '@/assets/wheat.jpg';
import riceImg from '@/assets/rice.jpg';
import seedsImg from '@/assets/seeds.jpg';
import fertilizerImg from '@/assets/fertilizer.jpg';

export const mockUsers: User[] = [
  { id: '1', name: 'Ramesh Kumar', email: 'ramesh@farm.com', role: 'farmer', location: 'Punjab' },
  { id: '2', name: 'Kavita Patel', email: 'kavita@farm.com', role: 'farmer', location: 'Gujarat' },
  { id: '3', name: 'Arjun Singh', email: 'arjun@buyer.com', role: 'buyer', location: 'Delhi' },
  { id: '4', name: 'AgroMart', email: 'contact@agromart.com', role: 'seller', location: 'Mumbai' },
  { id: '5', name: 'GreenFarms', email: 'info@greenfarms.com', role: 'seller', location: 'Bangalore' },
];

export const mockCrops: Crop[] = [
  {
    id: '1',
    name: 'Maize',
    farmer: 'Ramesh Kumar',
    quantity: 500,
    price: 25,
    location: 'Punjab',
    image: maizeImg,
    description: 'High-quality yellow maize, freshly harvested'
  },
  {
    id: '2',
    name: 'Onion',
    farmer: 'Kavita Patel',
    quantity: 300,
    price: 30,
    location: 'Gujarat',
    image: onionImg,
    description: 'Premium red onions, perfect for cooking'
  },
  {
    id: '3',
    name: 'Wheat',
    farmer: 'Ramesh Kumar',
    quantity: 800,
    price: 22,
    location: 'Punjab',
    image: wheatImg,
    description: 'Golden wheat grains, excellent quality'
  },
  {
    id: '4',
    name: 'Rice',
    farmer: 'Kavita Patel',
    quantity: 600,
    price: 35,
    location: 'Gujarat',
    image: riceImg,
    description: 'Basmati rice, aromatic and premium'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hybrid Rice Seeds',
    seller: 'AgroMart',
    category: 'seeds',
    price: 150,
    stock: 100,
    description: 'High-yield hybrid rice seeds with disease resistance',
    image: seedsImg
  },
  {
    id: '2',
    name: 'Organic Fertilizer',
    seller: 'GreenFarms',
    category: 'fertilizers',
    price: 80,
    stock: 200,
    description: 'Eco-friendly organic fertilizer for better soil health',
    image: fertilizerImg
  },
  {
    id: '3',
    name: 'Corn Seeds',
    seller: 'AgroMart',
    category: 'seeds',
    price: 120,
    stock: 75,
    description: 'Premium corn seeds for high productivity',
    image: seedsImg
  },
  {
    id: '4',
    name: 'NPK Fertilizer',
    seller: 'GreenFarms',
    category: 'fertilizers',
    price: 95,
    stock: 150,
    description: 'Balanced NPK fertilizer for all crops',
    image: fertilizerImg
  },
  {
    id: '5',
    name: 'Pesticide Spray',
    seller: 'AgroMart',
    category: 'pesticides',
    price: 60,
    stock: 80,
    description: 'Effective pesticide for crop protection',
    image: fertilizerImg
  }
];

export const locationData: Record<string, PredictionResult> = {
  '28.6139,77.2090': { // Delhi coordinates
    crop: 'Wheat',
    confidence: 85,
    reasoning: 'Optimal conditions: pH 6.8, Temperature 24°C, Humidity 65%',
    soilData: { pH: 6.8, clay: 25, sand: 45, silt: 30 },
    weatherData: { temperature: 24, humidity: 65, rainfall: 650 }
  },
  '23.0225,72.5714': { // Gujarat coordinates  
    crop: 'Cotton',
    confidence: 92,
    reasoning: 'Perfect conditions: pH 7.2, Temperature 28°C, High humidity 78%',
    soilData: { pH: 7.2, clay: 35, sand: 40, silt: 25 },
    weatherData: { temperature: 28, humidity: 78, rainfall: 800 }
  },
  '30.7333,76.7794': { // Punjab coordinates
    crop: 'Maize',
    confidence: 88,
    reasoning: 'Excellent conditions: pH 6.5, Temperature 26°C, Humidity 70%',
    soilData: { pH: 6.5, clay: 30, sand: 50, silt: 20 },
    weatherData: { temperature: 26, humidity: 70, rainfall: 720 }
  },
  'default': {
    crop: 'Onion',
    confidence: 79,
    reasoning: 'Good conditions: pH 6.0, Temperature 23°C, Humidity 91%',
    soilData: { pH: 6.0, clay: 28, sand: 42, silt: 30 },
    weatherData: { temperature: 23, humidity: 91, rainfall: 850 }
  }
};
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer' | 'seller';
  location: string;
}

export interface Crop {
  id: string;
  name: string;
  farmer: string;
  quantity: number;
  price: number;
  location: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  seller: string;
  category: 'seeds' | 'fertilizers' | 'pesticides';
  price: number;
  stock: number;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  buyer: string;
  item: string;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'delivered';
  type: 'crop' | 'product';
}

export interface PredictionResult {
  crop: string;
  confidence: number;
  reasoning: string;
  soilData: {
    pH: number;
    clay: number;
    sand: number;
    silt: number;
  };
  weatherData: {
    temperature: number;
    humidity: number;
    rainfall: number;
  };
}
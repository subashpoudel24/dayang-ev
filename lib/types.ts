export interface ScooterColor {
  name: string;
  hex: string;
  code: string;
}

export interface ScooterSpecs {
  motorPower: string;
  peakPower: string;
  battery: string;
  range: string;
  topSpeed: string;
  chargingTime: string;
  weight: string;
  maxLoad: string;
  brakes: string;
  tires: string;
  suspension: string;
  warranty: string;
}

export interface Scooter {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'Sport' | 'Cruiser' | 'Commuter' | 'Cargo';
  badge?: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: ScooterSpecs;
  features: string[];
  description: string;
  colors: ScooterColor[];
  createdAt?: string;
}

export interface ScooterFilterParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRange?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'range-desc' | 'speed-desc' | 'popular';
}

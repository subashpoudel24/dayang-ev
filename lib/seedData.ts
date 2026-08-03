import { Scooter } from './types';

export const INITIAL_SCOOTERS: Scooter[] = [
  {
    id: 'dayang-viper-spacex-v15',
    slug: 'dayang-viper-spacex-v15',
    name: 'Dayang Viper SpaceX V15',
    tagline: 'High-Performance Smart Electric Scooter with Graphene Battery',
    price: 165000,
    originalPrice: 175000,
    category: 'Sport',
    badge: 'Smart Technology',
    inStock: true,
    rating: 4.9,
    reviewsCount: 148,
    images: [
      '/images/dayang_v15.png',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      motorPower: '1500W Rated (3000W Peak)',
      peakPower: '3000W BLDC Hub Motor',
      battery: '72V 32Ah Graphene (2.3 kW)',
      range: '90 km',
      topSpeed: '65 km/h',
      chargingTime: '3.5 Hours',
      weight: '85 kg',
      maxLoad: '180 kg',
      brakes: 'F & R Dual Disk Brakes',
      tires: '90/80 - 12 Tubeless',
      suspension: 'F: Hydraulic, R: Dual Spring',
      warranty: '1 Year Warranty'
    },
    features: [
      'Speed Shift Transmission Modes',
      'Reverse Gear Assist',
      'TCS Cruise Control System',
      'Smart Anti-Theft Alarm Sensor',
      '72V 32Ah High Density Graphene Battery',
      'Dual Hydraulic Front & Rear Spring Suspension'
    ],
    description: 'The Dayang Viper SpaceX V15 represents cutting-edge urban electric mobility. Powered by a 1500W rated BLDC hub motor with 3000W peak surge, 72V 32Ah Graphene battery delivering 90km range, speed shift controls, reverse gear, TCS cruise control, and dual disc brakes for maximum safety and comfort.',
    colors: [
      { name: 'Pearl White & Orange', hex: '#f8fafc', code: 'white' },
      { name: 'Matte Grey', hex: '#475569', code: 'grey' },
      { name: 'Vibrant Orange', hex: '#ea580c', code: 'orange' }
    ]
  },
  {
    id: 'dayang-storm-x-es6',
    slug: 'dayang-storm-x-es6',
    name: 'Dayang Storm-X ES6',
    tagline: 'Transport yourself easily, quickly, and safely in our ES6',
    price: 160000,
    originalPrice: 170000,
    category: 'Commuter',
    badge: 'Best Seller',
    inStock: true,
    rating: 4.85,
    reviewsCount: 192,
    images: [
      '/images/dayang_es6.png',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      motorPower: '1500W Rated (3000W Peak)',
      peakPower: '3000W BLDC Hub Motor',
      battery: '72V 32Ah Graphene (2.3 kW)',
      range: '90 km',
      topSpeed: '65 km/h',
      chargingTime: '3.5 Hours',
      weight: '82 kg',
      maxLoad: '175 kg',
      brakes: 'F & R Dual Disk Brakes',
      tires: '90/80 - 12 Tubeless',
      suspension: 'F: Hydraulic, R: Dual Spring',
      warranty: '1 Year Warranty'
    },
    features: [
      'Speed Shift System',
      'Reverse Gear Function',
      'TCS Cruise Control',
      'Alarm Sensor Security',
      '72V 32Ah Graphene Cell Pack',
      'Front Hydraulic & Dual Rear Springs'
    ],
    description: 'Engineered for effortless urban commutes, the Dayang Storm-X ES6 combines an aggressive aerodynamic front cowl, 1500W rated BLDC Hub Motor, 72V 32Ah Graphene power pack, TCS cruise control, and reverse gear in a stylish and durable package.',
    colors: [
      { name: 'Vibrant Orange', hex: '#ea580c', code: 'orange' },
      { name: 'Matte Grey', hex: '#334155', code: 'grey' }
    ]
  }
];

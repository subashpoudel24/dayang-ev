import type { NextApiRequest, NextApiResponse } from 'next';
import type { Document } from 'mongodb';
import { getDatabase } from '../../../lib/mongodb';
import { INITIAL_SCOOTERS } from '../../../lib/seedData';
import { Scooter } from '../../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { search, category, minPrice, maxPrice, minRange, sortBy } = req.query;

    const { db } = await getDatabase();
    let scootersList: Scooter[] = [];

    if (db) {
      const collection = db.collection('scooters');
      const count = await collection.countDocuments();
      if (count === 0) {
        // Auto seed if database is empty
        await collection.insertMany(INITIAL_SCOOTERS as unknown as Document[]);
      }
      
      const mongoDocs = await collection.find({}).toArray();
      scootersList = mongoDocs.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
      })) as unknown as Scooter[];
    } else {
      // Fallback mode if MongoDB is not accessible
      scootersList = [...INITIAL_SCOOTERS];
    }

    // Apply filtering
    let filtered = [...scootersList];

    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (category && typeof category === 'string' && category !== 'All') {
      filtered = filtered.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      filtered = filtered.filter(s => s.price >= Number(minPrice));
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      filtered = filtered.filter(s => s.price <= Number(maxPrice));
    }

    if (minRange && !isNaN(Number(minRange))) {
      filtered = filtered.filter(s => {
        const rangeNum = parseInt(s.specs.range, 10);
        return !isNaN(rangeNum) ? rangeNum >= Number(minRange) : true;
      });
    }

    // Apply sorting
    if (sortBy && typeof sortBy === 'string') {
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'range-desc':
          filtered.sort((a, b) => parseInt(b.specs.range, 10) - parseInt(a.specs.range, 10));
          break;
        case 'speed-desc':
          filtered.sort((a, b) => parseInt(b.specs.topSpeed, 10) - parseInt(a.specs.topSpeed, 10));
          break;
        case 'popular':
        default:
          filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
          break;
      }
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error('API /api/scooters Error:', error);
    // Graceful fallback response
    return res.status(200).json({
      success: true,
      count: INITIAL_SCOOTERS.length,
      data: INITIAL_SCOOTERS,
      fallbackMode: true,
    });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Document } from 'mongodb';
import { getDatabase } from '../../lib/mongodb';
import { INITIAL_SCOOTERS } from '../../lib/seedData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { db } = await getDatabase();
    if (!db) {
      return res.status(200).json({
        success: true,
        message: 'Operating in demo mode without live MongoDB. Data is served from local seed store.',
        count: INITIAL_SCOOTERS.length,
        fallbackMode: true,
      });
    }

    const collection = db.collection('scooters');
    
    // Clear existing scooters if requested via reset query parameter
    if (req.query.reset === 'true') {
      await collection.deleteMany({});
    }

    const count = await collection.countDocuments();
    if (count === 0 || req.query.reset === 'true') {
      const result = await collection.insertMany(INITIAL_SCOOTERS as unknown as Document[]);
      return res.status(200).json({
        success: true,
        message: `Successfully seeded MongoDB collection with ${result.insertedCount} scooters.`,
        insertedCount: result.insertedCount,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Database already populated with ${count} scooters. Pass ?reset=true to re-seed.`,
      count,
    });
  } catch (error) {
    console.error('API Seed Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: (error as Error).message,
    });
  }
}

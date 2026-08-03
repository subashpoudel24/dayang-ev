import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { INITIAL_SCOOTERS } from '../../../lib/seedData';
import { Scooter } from '../../../lib/types';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Scooter ID or Slug parameter is required' });
  }

  try {
    const { db } = await getDatabase();
    let scooter: Scooter | null = null;

    if (db) {
      const collection = db.collection('scooters');
      
      const orConditions: Record<string, unknown>[] = [
        { id: id },
        { slug: id }
      ];

      if (ObjectId.isValid(id)) {
        orConditions.push({ _id: new ObjectId(id) });
      }

      const doc = await collection.findOne({ $or: orConditions });
      if (doc) {
        scooter = {
          ...doc,
          _id: doc._id.toString(),
        } as unknown as Scooter;
      }
    }

    // Fallback search in seed data if not found in DB or DB disconnected
    if (!scooter) {
      const foundInSeed = INITIAL_SCOOTERS.find(s => s.id === id || s.slug === id);
      if (foundInSeed) {
        scooter = foundInSeed;
      }
    }

    if (!scooter) {
      return res.status(404).json({ success: false, message: 'Scooter not found' });
    }

    return res.status(200).json({
      success: true,
      data: scooter,
    });
  } catch (error) {
    console.error(`API /api/scooters/${id} Error:`, error);
    
    // Fallback look up in static seed array
    const fallback = INITIAL_SCOOTERS.find(s => s.id === id || s.slug === id);
    if (fallback) {
      return res.status(200).json({ success: true, data: fallback });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch scooter details',
      error: (error as Error).message,
    });
  }
}

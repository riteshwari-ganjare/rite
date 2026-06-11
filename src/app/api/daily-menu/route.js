export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import DailyMenu from '@/app/models/DailyMenu';
import mongoose from 'mongoose';
import Item from '@/app/models/Item'; // Ensure Item model is registered for populate

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const userEmail = searchParams.get('userEmail');
    const location = searchParams.get('location') || 'Central Facility Building';

    if (!date || !userEmail || !location) {
      return NextResponse.json({ message: 'date, userEmail, and location are required' }, { status: 400 });
    }

    const menu = await DailyMenu.findOne({ userEmail, date, location }).populate('items').lean();

    return NextResponse.json({ menu: menu || { userEmail, date, location, startTime: '09:00', items: [] } }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userEmail, date, location, startTime, items } = await req.json();

    if (!userEmail || !date || !location || !startTime || !Array.isArray(items)) {
      return NextResponse.json({ message: 'userEmail, date, location, startTime, items[] are required' }, { status: 400 });
    }

    // Validate that all strings in items are valid ObjectIds
    const isValidIds = items.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!isValidIds) {
      return NextResponse.json({ message: 'One or more selected items have invalid IDs.' }, { status: 400 });
    }

    // Use findOneAndUpdate with upsert: true
    // This finds the menu for the user/date/location and updates the items list.
    // If it doesn't exist, it creates it.
    const updatedMenu = await DailyMenu.findOneAndUpdate(
      { userEmail, date, location }, // Query by userEmail, date, and location
      { items, startTime }, // Update items and startTime
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    return NextResponse.json({ menu: updatedMenu }, { status: 200 });
  } catch (error) {
    // Specific check for Duplicate Key Error (Index Conflict)
    if (error.code === 11000) {
      return NextResponse.json({ 
        message: 'Database Index Conflict: Please drop the old "userEmail_1_date_1" index in MongoDB Compass.',
        error: error.message 
      }, { status: 409 });
    }
    console.error('Daily Menu POST Error:', error);
    return NextResponse.json({ 
      message: error.message || 'Failed to update menu.', 
      error: error.message 
    }, { status: 500 });
  }
}

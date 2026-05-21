export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import DailyMenu from '@/app/models/DailyMenu';

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    // timeSlot is no longer part of the query
    const userEmail = searchParams.get('userEmail');

    if (!date || !userEmail) {
      return NextResponse.json({ message: 'date and userEmail are required' }, { status: 400 });
    }

    const menu = await DailyMenu.findOne({ userEmail, date }).populate('items').lean();

    return NextResponse.json({ menu: menu || { userEmail, date, startTime: '09:00', items: [] } }, { status: 200 }); // Default startTime for new menus

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const { userEmail, date, startTime, items } = await req.json();

    if (!userEmail || !date || !startTime || !Array.isArray(items)) {
      return NextResponse.json({ message: 'userEmail, date, startTime, items[] are required' }, { status: 400 });
    }

    // Use findOneAndUpdate with upsert: true
    // This finds the menu for the user/date/slot and updates the items list.
    // If it doesn't exist, it creates it.
    const updatedMenu = await DailyMenu.findOneAndUpdate(
      { userEmail, date }, // Query only by userEmail and date
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
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

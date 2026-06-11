export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import DailyMenu from '@/app/models/DailyMenu';

export async function POST() {
  try {
    await connectToDatabase();
    await DailyMenu.collection.dropIndex('userEmail_1_date_1');
    return NextResponse.json({ message: 'Old index dropped. Save should now work.' }, { status: 200 });
  } catch (error) {
    if (error.codeName === 'IndexNotFound') {
      return NextResponse.json({ message: 'Index already gone - nothing to drop.' }, { status: 200 });
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

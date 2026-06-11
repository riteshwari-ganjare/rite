export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import Item from '@/app/models/Item';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const validTypes = ['food', 'drink', 'cake', 'icecream'];

    if (type && !validTypes.includes(type)) {
      return NextResponse.json({ message: `Type must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }

    const query = type ? { type } : {};
    const items = await Item.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { type, name, description, image, price, createdBy } = await req.json();
    const validTypes = ['food', 'drink', 'cake', 'icecream'];

    if (!type || !name || !validTypes.includes(type)) {
      return NextResponse.json({ message: 'Invalid payload: category and name are required' }, { status: 400 });
    }

    const item = await Item.create({
      type,
      name,
      description: description || '',
      image: image || '',
      price: typeof price === 'number' ? price : Number(price || 0),
      createdBy: createdBy || '',
    });


    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

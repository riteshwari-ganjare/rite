import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import Item from '@/app/models/Item';

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    if (type !== 'food' && type !== 'drink') {
      return NextResponse.json({ message: 'type must be food or drink' }, { status: 400 });
    }

    const items = await Item.find({ type }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const { type, name, description, image, price, createdBy } = await req.json();


    if (!type || !name || (type !== 'food' && type !== 'drink')) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
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


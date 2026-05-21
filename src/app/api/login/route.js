export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongoose';
import { User, LoginHistory } from '@/app/models/User';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json(
      {
        message: 'Login API is active.',
        database: mongoose.connection.name,
        readyState: mongoose.connection.readyState,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    // Auto-seed the specific Canteen Admin record if it doesn't exist
    const existingAdmin = await User.findOne({ email: 'riteshwari' });
    if (!existingAdmin) {
      await User.create({
        name: 'Riteshwari Ganjare',
        email: 'riteshwari',
        password: 'Ritu@123',
        category: 'other',
      });
    }

    // Verify credentials directly against the database
    const userFound = await User.findOne({ email, password });

    if (userFound) {
      // Log the successful login event
      await LoginHistory.create({ user: email });

      return NextResponse.json(
        { message: 'Login successful!', token: 'canteen_token_123' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid User ID or Password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Mongoose Database Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

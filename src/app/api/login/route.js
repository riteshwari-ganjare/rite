import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection URI for the Canteen Management database
const MONGODB_URI = 'mongodb://localhost:27017/Canteen_management';

// Define a Mongoose Schema for Users
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: String,
});

// Define a Mongoose Schema for login history
const LoginHistorySchema = new mongoose.Schema({
  user: String,
  loginAt: { type: Date, default: Date.now },
});

// Prevent model re-definition during Next.js hot reloads
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const LoginHistory = mongoose.models.LoginHistory || mongoose.model('LoginHistory', LoginHistorySchema);

async function ensureConnected() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET() {
  try {
    await ensureConnected();
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
    await ensureConnected();

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


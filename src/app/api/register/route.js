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

// Prevent model re-definition during Next.js hot reloads
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function ensureConnected() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function POST(req) {
  try {
    await ensureConnected();

    const { name, email, password, category } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // Basic duplicate check
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'User already exists. Please login.' }, { status: 409 });
    }

    await User.create({ name, email, password, category });

    return NextResponse.json({ message: 'Registered successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}


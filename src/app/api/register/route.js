import { NextResponse } from 'next/server';
import { connectToDatabase, mongoose } from '@/app/lib/mongoose';

// Define a Mongoose Schema for Users
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: String,
});

// Prevent model re-definition during Next.js hot reloads
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(req) {
  try {
    await connectToDatabase();

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

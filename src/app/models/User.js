import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

const LoginHistorySchema = new mongoose.Schema({
  user: { type: String, required: true },
  loginTime: { type: Date, default: Date.now }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const LoginHistory = mongoose.models.LoginHistory || mongoose.model('LoginHistory', LoginHistorySchema);
import mongoose from 'mongoose';

const DailyMenuSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    location: { type: String, required: true, index: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
    ],
    startTime: { type: String, required: true }, // e.g., "09:00", "14:30"

  }, 
  { timestamps: true }
);

DailyMenuSchema.index({ userEmail: 1, date: 1, location: 1 }, { unique: true });

export default mongoose.models.DailyMenu || mongoose.model('DailyMenu', DailyMenuSchema);

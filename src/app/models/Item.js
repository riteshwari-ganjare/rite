import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['food', 'drink'], required: true, index: true },
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // can be URL or filename
    price: { type: Number, default: 0 },
    createdBy: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);


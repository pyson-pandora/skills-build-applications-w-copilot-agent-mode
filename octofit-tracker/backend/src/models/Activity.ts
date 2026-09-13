import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  intensity?: 'low' | 'medium' | 'high';
  notes?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'hiking', 'sports', 'other'],
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      required: true,
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    notes: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', activitySchema);

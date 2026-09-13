import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  estimatedCalories: number;
  exercises: {
    name: string;
    reps?: number;
    sets?: number;
    duration?: number;
  }[];
  targetMuscles?: string[];
  equipmentNeeded?: string[];
  createdBy?: Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
      enum: ['strength', 'cardio', 'flexibility', 'mixed', 'hiit', 'yoga', 'pilates', 'other'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    duration: {
      type: Number,
      required: true,
    },
    estimatedCalories: {
      type: Number,
      required: true,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        reps: Number,
        sets: Number,
        duration: Number,
      },
    ],
    targetMuscles: [String],
    equipmentNeeded: [String],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', workoutSchema);

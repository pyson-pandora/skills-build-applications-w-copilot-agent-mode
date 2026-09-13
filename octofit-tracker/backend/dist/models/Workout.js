import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
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
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);

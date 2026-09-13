import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
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
}, { timestamps: true });
export const Activity = model('Activity', activitySchema);

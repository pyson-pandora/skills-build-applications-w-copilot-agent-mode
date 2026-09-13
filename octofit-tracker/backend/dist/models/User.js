import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: '',
    },
    totalCalories: {
        type: Number,
        default: 0,
    },
    totalDistance: {
        type: Number,
        default: 0,
    },
    totalActivities: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export const User = model('User', userSchema);

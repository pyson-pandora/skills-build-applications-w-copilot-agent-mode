import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null,
    },
    metric: {
        type: String,
        required: true,
        enum: ['calories', 'distance', 'activities', 'streaks', 'points'],
    },
    rank: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
// Compound index for efficient leaderboard queries
leaderboardSchema.index({ metric: 1, rank: 1 });
leaderboardSchema.index({ teamId: 1, metric: 1, rank: 1 });
export const Leaderboard = model('Leaderboard', leaderboardSchema);

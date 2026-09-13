import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
const router = Router();
// GET global leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({ teamId: null })
            .sort({ rank: 1 })
            .populate('userId');
        res.json({
            message: 'GET /api/leaderboard - Retrieve global leaderboard',
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
});
// GET team leaderboard
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const leaderboard = await Leaderboard.find({ teamId })
            .sort({ rank: 1 })
            .populate('userId');
        res.json({
            message: `GET /api/leaderboard/team/${teamId} - Retrieve team leaderboard`,
            teamId,
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team leaderboard' });
    }
});
// GET leaderboard by metric
router.get('/:metric', async (req, res) => {
    try {
        const { metric } = req.params;
        const leaderboard = await Leaderboard.find({ metric, teamId: null })
            .sort({ rank: 1 })
            .populate('userId');
        res.json({
            message: `GET /api/leaderboard/${metric} - Retrieve leaderboard ranked by ${metric}`,
            metric,
            count: leaderboard.length,
            data: leaderboard,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
});
// POST update leaderboard
router.post('/update', async (req, res) => {
    try {
        const { userId, metric, value, rank } = req.body;
        const entry = await Leaderboard.findOneAndUpdate({ userId, metric }, { value, rank }, { new: true, upsert: true });
        res.status(201).json({
            message: 'POST /api/leaderboard/update - Update leaderboard entry',
            data: entry,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;

import { Router } from 'express';
import { Workout } from '../models/Workout.js';
const router = Router();
// GET all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().populate('createdBy');
        res.json({
            message: 'GET /api/workouts - Retrieve all workouts',
            count: workouts.length,
            data: workouts,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout.findById(id).populate('createdBy');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: `GET /api/workouts/${id} - Retrieve workout with ID ${id}`,
            data: workout,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve workout' });
    }
});
// GET suggested workouts for user
router.get('/suggest/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Simple recommendation: return workouts based on difficulty
        const workouts = await Workout.find({ isPublic: true });
        res.json({
            message: `GET /api/workouts/suggest/${userId} - Get personalized workout suggestions for user ${userId}`,
            userId,
            count: workouts.length,
            suggestions: workouts,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve suggestions' });
    }
});
// POST create new workout
router.post('/', async (req, res) => {
    try {
        const { name, description, type, difficulty, duration, estimatedCalories, exercises } = req.body;
        const newWorkout = await Workout.create({
            name,
            description,
            type,
            difficulty,
            duration,
            estimatedCalories,
            exercises,
        });
        res.status(201).json({
            message: 'POST /api/workouts - Create new workout',
            data: newWorkout,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// PUT update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: `PUT /api/workouts/${id} - Update workout with ID ${id}`,
            data: updatedWorkout,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// DELETE workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: `DELETE /api/workouts/${id} - Delete workout with ID ${id}`,
            data: deletedWorkout,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;

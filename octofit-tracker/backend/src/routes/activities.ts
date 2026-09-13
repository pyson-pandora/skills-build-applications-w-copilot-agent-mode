import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json({
      message: 'GET /api/activities - Retrieve all activities',
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `GET /api/activities/${id} - Retrieve activity with ID ${id}`,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve activity' });
  }
});

// GET activities for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId }).populate('userId');
    res.json({
      message: `GET /api/activities/user/${userId} - Retrieve activities for user ${userId}`,
      userId,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user activities' });
  }
});

// POST log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, timestamp } = req.body;
    const newActivity = await Activity.create({
      userId,
      type,
      duration,
      distance,
      calories,
      timestamp: timestamp || new Date(),
    });
    res.status(201).json({
      message: 'POST /api/activities - Log new activity',
      data: newActivity,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `PUT /api/activities/${id} - Update activity with ID ${id}`,
      data: updatedActivity,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activity.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `DELETE /api/activities/${id} - Delete activity with ID ${id}`,
      data: deletedActivity,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

import { Router } from 'express';
import { User } from '../models/User.js';
const router = Router();
// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            message: 'GET /api/users - Retrieve all users',
            count: users.length,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: `GET /api/users/${id} - Retrieve user with ID ${id}`,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});
// POST create new user
router.post('/', async (req, res) => {
    try {
        const { email, name, username } = req.body;
        const newUser = await User.create({
            email,
            name,
            username,
        });
        res.status(201).json({
            message: 'POST /api/users - Create new user',
            data: newUser,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: `PUT /api/users/${id} - Update user with ID ${id}`,
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: `DELETE /api/users/${id} - Delete user with ID ${id}`,
            data: deletedUser,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;

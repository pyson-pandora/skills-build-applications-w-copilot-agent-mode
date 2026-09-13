import { Router } from 'express';
import { Team } from '../models/Team.js';
const router = Router();
// GET all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find().populate('createdBy members');
        res.json({
            message: 'GET /api/teams - Retrieve all teams',
            count: teams.length,
            data: teams,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve teams' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id).populate('createdBy members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `GET /api/teams/${id} - Retrieve team with ID ${id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve team' });
    }
});
// POST create new team
router.post('/', async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;
        const newTeam = await Team.create({
            name,
            description,
            createdBy,
            members: [createdBy],
        });
        res.status(201).json({
            message: 'POST /api/teams - Create new team',
            data: newTeam,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `PUT /api/teams/${id} - Update team with ID ${id}`,
            data: updatedTeam,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTeam = await Team.findByIdAndDelete(id);
        if (!deletedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `DELETE /api/teams/${id} - Delete team with ID ${id}`,
            data: deletedTeam,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// POST add member to team
router.post('/:id/members', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        if (!team.members.includes(userId)) {
            team.members.push(userId);
            await team.save();
        }
        res.status(201).json({
            message: `POST /api/teams/${id}/members - Add member to team`,
            data: team,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;

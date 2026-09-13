import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
// Load environment variables
dotenv.config();
// Import routes
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
// Initialize Express app
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS setup for Codespaces
app.use((req, res, next) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const origin = codespaceName
        ? `https://${codespaceName}-5173.app.github.dev`
        : 'http://localhost:5173';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'OctoFit Tracker API is running',
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
});
// Start server with MongoDB connection
async function startServer() {
    try {
        // Connect to MongoDB
        await connectDB();
        const PORT = process.env.PORT || 8000;
        const codespaceName = process.env.CODESPACE_NAME;
        // Generate base URL based on environment
        const baseUrl = codespaceName
            ? `https://${codespaceName}-8000.app.github.dev`
            : `http://localhost:${PORT}`;
        app.listen(PORT, () => {
            console.log(`\n🚀 OctoFit Tracker API Server`);
            console.log(`📍 Environment: ${codespaceName ? 'GitHub Codespaces' : 'localhost'}`);
            console.log(`📍 Server running at: ${baseUrl}`);
            console.log(`✅ Health check: ${baseUrl}/api/health`);
            console.log(`👥 Users API: ${baseUrl}/api/users`);
            console.log(`⚡ Activities API: ${baseUrl}/api/activities\n`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
// Start the server
startServer();
export default app;

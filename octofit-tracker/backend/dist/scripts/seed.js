import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
/**
 * Seed the octofit_db database with test data
 *
 * This script populates the database with realistic sample data including:
 * - Users with fitness profiles
 * - Teams for group challenges
 * - Activities (logged workouts)
 * - Leaderboard rankings
 * - Pre-defined workout templates
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seed() {
    try {
        console.log('\n🌱 Starting database seed...');
        console.log(`📊 Connecting to MongoDB at: ${MONGODB_URI}\n`);
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Team.deleteMany({});
        await Activity.deleteMany({});
        await Leaderboard.deleteMany({});
        await Workout.deleteMany({});
        console.log('✅ Database cleared\n');
        // Seed Users
        console.log('👥 Creating users...');
        const users = await User.insertMany([
            {
                email: 'alice@example.com',
                name: 'Alice Johnson',
                username: 'alice_fit',
                bio: 'Marathon runner and fitness enthusiast',
                totalCalories: 15420,
                totalDistance: 245.5,
                totalActivities: 48,
            },
            {
                email: 'bob@example.com',
                name: 'Bob Smith',
                username: 'bob_gains',
                bio: 'Strength training focused',
                totalCalories: 18650,
                totalDistance: 85.2,
                totalActivities: 62,
            },
            {
                email: 'carol@example.com',
                name: 'Carol Chen',
                username: 'carol_yoga',
                bio: 'Yoga instructor and wellness coach',
                totalCalories: 12340,
                totalDistance: 120.8,
                totalActivities: 55,
            },
            {
                email: 'david@example.com',
                name: 'David Williams',
                username: 'david_cycle',
                bio: 'Cycling and outdoor activities',
                totalCalories: 19200,
                totalDistance: 456.3,
                totalActivities: 41,
            },
            {
                email: 'emma@example.com',
                name: 'Emma Davis',
                username: 'emma_swim',
                bio: 'Competitive swimmer',
                totalCalories: 21450,
                totalDistance: 185.6,
                totalActivities: 53,
            },
        ]);
        console.log(`✅ Created ${users.length} users\n`);
        // Seed Teams
        console.log('🏆 Creating teams...');
        const teams = await Team.insertMany([
            {
                name: 'Morning Warriors',
                description: 'Early birds who love morning workouts',
                createdBy: users[0]._id,
                members: [users[0]._id, users[1]._id, users[3]._id],
                totalCalories: 53270,
                totalDistance: 786.0,
            },
            {
                name: 'Fitness Collective',
                description: 'A diverse group focusing on overall wellness',
                createdBy: users[2]._id,
                members: [users[2]._id, users[4]._id, users[1]._id],
                totalCalories: 51990,
                totalDistance: 492.7,
            },
            {
                name: 'Endurance Seekers',
                description: 'Long-distance running and cycling challenges',
                createdBy: users[3]._id,
                members: [users[3]._id, users[0]._id, users[4]._id],
                totalCalories: 56070,
                totalDistance: 887.4,
            },
        ]);
        console.log(`✅ Created ${teams.length} teams\n`);
        // Seed Activities
        console.log('⚡ Creating activities...');
        const activities = await Activity.insertMany([
            // Alice's activities
            {
                userId: users[0]._id,
                type: 'running',
                duration: 45,
                distance: 8.5,
                calories: 650,
                intensity: 'high',
                notes: 'Morning run in the park',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[0]._id,
                type: 'cycling',
                duration: 60,
                distance: 25.3,
                calories: 520,
                intensity: 'medium',
                notes: 'Scenic route around town',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            // Bob's activities
            {
                userId: users[1]._id,
                type: 'gym',
                duration: 75,
                distance: 0,
                calories: 890,
                intensity: 'high',
                notes: 'Full body strength training',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[1]._id,
                type: 'sports',
                duration: 55,
                distance: 5.2,
                calories: 620,
                intensity: 'high',
                notes: 'Basketball game',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            // Carol's activities
            {
                userId: users[2]._id,
                type: 'yoga',
                duration: 90,
                distance: 0,
                calories: 320,
                intensity: 'low',
                notes: 'Vinyasa flow class',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            {
                userId: users[2]._id,
                type: 'walking',
                duration: 45,
                distance: 4.1,
                calories: 280,
                intensity: 'low',
                notes: 'Nature walk',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
            // David's activities
            {
                userId: users[3]._id,
                type: 'cycling',
                duration: 120,
                distance: 58.2,
                calories: 1240,
                intensity: 'high',
                notes: 'Long distance tour',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
            // Emma's activities
            {
                userId: users[4]._id,
                type: 'swimming',
                duration: 50,
                distance: 2.5,
                calories: 750,
                intensity: 'high',
                notes: 'Lap swimming',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
        ]);
        console.log(`✅ Created ${activities.length} activities\n`);
        // Seed Workouts
        console.log('🏋️  Creating workout templates...');
        const workouts = await Workout.insertMany([
            {
                name: 'Morning HIIT Blast',
                description: 'High-intensity interval training perfect for busy mornings',
                type: 'hiit',
                difficulty: 'intermediate',
                duration: 30,
                estimatedCalories: 450,
                exercises: [
                    { name: 'Burpees', reps: 15, sets: 3 },
                    { name: 'Jump Squats', reps: 20, sets: 3 },
                    { name: 'Mountain Climbers', duration: 45, sets: 3 },
                    { name: 'High Knees', duration: 45, sets: 3 },
                ],
                targetMuscles: ['full body'],
                equipmentNeeded: [],
                isPublic: true,
            },
            {
                name: 'Strength Builder',
                description: 'Complete full-body strength training routine',
                type: 'strength',
                difficulty: 'advanced',
                duration: 60,
                estimatedCalories: 650,
                exercises: [
                    { name: 'Deadlifts', reps: 5, sets: 4 },
                    { name: 'Bench Press', reps: 8, sets: 4 },
                    { name: 'Squats', reps: 8, sets: 4 },
                    { name: 'Barbell Rows', reps: 8, sets: 3 },
                ],
                targetMuscles: ['chest', 'back', 'legs', 'arms'],
                equipmentNeeded: ['barbell', 'weights', 'bench'],
                isPublic: true,
            },
            {
                name: 'Yoga Flow for Beginners',
                description: 'Gentle yoga sequence perfect for stress relief',
                type: 'yoga',
                difficulty: 'beginner',
                duration: 45,
                estimatedCalories: 200,
                exercises: [
                    { name: 'Sun Salutation', sets: 5 },
                    { name: 'Warrior Poses', duration: 30, sets: 1 },
                    { name: 'Tree Pose', duration: 20, sets: 3 },
                    { name: 'Child Pose', duration: 60, sets: 1 },
                ],
                targetMuscles: ['full body', 'mind'],
                equipmentNeeded: ['yoga mat'],
                isPublic: true,
            },
            {
                name: '5K Running Program',
                description: 'Build endurance for a 5K race',
                type: 'cardio',
                difficulty: 'intermediate',
                duration: 40,
                estimatedCalories: 550,
                exercises: [
                    { name: 'Warm-up jog', duration: 5 },
                    { name: 'Tempo run', duration: 25 },
                    { name: 'Cool-down walk', duration: 10 },
                ],
                targetMuscles: ['legs', 'cardiovascular'],
                equipmentNeeded: ['running shoes'],
                isPublic: true,
            },
            {
                name: 'Pilates Core',
                description: 'Strengthen your core with pilates exercises',
                type: 'pilates',
                difficulty: 'beginner',
                duration: 35,
                estimatedCalories: 280,
                exercises: [
                    { name: 'The Hundred', reps: 100, sets: 1 },
                    { name: 'Roll Up', reps: 10, sets: 2 },
                    { name: 'Single Leg Circle', reps: 10, sets: 2 },
                    { name: 'Criss Cross', reps: 10, sets: 2 },
                ],
                targetMuscles: ['core', 'abs'],
                equipmentNeeded: ['yoga mat'],
                isPublic: true,
            },
        ]);
        console.log(`✅ Created ${workouts.length} workouts\n`);
        // Seed Leaderboard
        console.log('🏅 Creating leaderboard entries...');
        const leaderboardEntries = await Leaderboard.insertMany([
            // Calories leaderboard
            { userId: users[4]._id, metric: 'calories', rank: 1, value: 21450 },
            { userId: users[3]._id, metric: 'calories', rank: 2, value: 19200 },
            { userId: users[1]._id, metric: 'calories', rank: 3, value: 18650 },
            { userId: users[0]._id, metric: 'calories', rank: 4, value: 15420 },
            { userId: users[2]._id, metric: 'calories', rank: 5, value: 12340 },
            // Distance leaderboard
            { userId: users[3]._id, metric: 'distance', rank: 1, value: 456.3 },
            { userId: users[0]._id, metric: 'distance', rank: 2, value: 245.5 },
            { userId: users[4]._id, metric: 'distance', rank: 3, value: 185.6 },
            { userId: users[2]._id, metric: 'distance', rank: 4, value: 120.8 },
            { userId: users[1]._id, metric: 'distance', rank: 5, value: 85.2 },
            // Activities count leaderboard
            { userId: users[1]._id, metric: 'activities', rank: 1, value: 62 },
            { userId: users[2]._id, metric: 'activities', rank: 2, value: 55 },
            { userId: users[4]._id, metric: 'activities', rank: 3, value: 53 },
            { userId: users[0]._id, metric: 'activities', rank: 4, value: 48 },
            { userId: users[3]._id, metric: 'activities', rank: 5, value: 41 },
            // Team leaderboards
            { userId: users[0]._id, teamId: teams[0]._id, metric: 'calories', rank: 1, value: 15420 },
            { userId: users[3]._id, teamId: teams[2]._id, metric: 'distance', rank: 1, value: 456.3 },
        ]);
        console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries\n`);
        console.log('✨ Database seeding completed successfully!\n');
        console.log('📊 Summary:');
        console.log(`   • Users: ${users.length}`);
        console.log(`   • Teams: ${teams.length}`);
        console.log(`   • Activities: ${activities.length}`);
        console.log(`   • Workouts: ${workouts.length}`);
        console.log(`   • Leaderboard entries: ${leaderboardEntries.length}\n`);
        console.log('🎯 Next steps:');
        console.log('   1. Test the API endpoints');
        console.log('   2. Connect the frontend to the backend');
        console.log('   3. Implement user authentication\n');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
        console.log('🔌 MongoDB disconnected\n');
    }
}
seed();

# OctoFit Tracker Data Tier - MongoDB + Mongoose Setup

## Overview

The data tier for OctoFit Tracker uses MongoDB as the database engine with Mongoose as the ODM (Object Document Mapper) for schema validation and data management. All data is stored in the `octofit_db` database on `localhost:27017`.

## Setup Instructions

### 1. Start MongoDB

Ensure MongoDB is running on port 27017:

```bash
# Check if mongod is running
ps aux | grep mongod

# If not running, start it
mongod --dbpath /data/db --fork --logpath /tmp/mongod.log
```

### 2. Database Connection

The application connects to MongoDB via the connection string:

```
mongodb://localhost:27017/octofit_db
```

This can be configured via the `MONGODB_URI` environment variable in `.env`.

### 3. Seed the Database

Populate the database with sample test data:

```bash
npm run seed --prefix octofit-tracker/backend
```

This creates:
- **5 Users** with realistic fitness profiles
- **3 Teams** with members and aggregate stats
- **8 Activities** (logged workouts) with varied types and intensities
- **5 Workout Templates** (beginner to advanced)
- **17 Leaderboard Entries** across different metrics

## Database Schema

### Collections

#### **Users**
Stores user profiles and fitness statistics.

```typescript
{
  email: string (unique)
  name: string
  username: string (unique)
  password?: string
  avatar?: string
  bio?: string
  totalCalories?: number
  totalDistance?: number
  totalActivities?: number
  createdAt: Date
  updatedAt: Date
}
```

**Sample:**
```
Alice Johnson (alice_fit) - 15,420 calories burned, 245.5 km, 48 activities
```

#### **Teams**
Groups of users for collaborative fitness challenges.

```typescript
{
  name: string
  description: string
  createdBy: ObjectId (ref: User)
  members: ObjectId[] (ref: User)
  totalCalories?: number
  totalDistance?: number
  createdAt: Date
  updatedAt: Date
}
```

**Sample:**
```
Morning Warriors - 3 members, 53,270 calories total
```

#### **Activities**
Individual logged workouts/exercises.

```typescript
{
  userId: ObjectId (ref: User)
  type: string (running|cycling|swimming|gym|yoga|walking|hiking|sports|other)
  duration: number (minutes)
  distance?: number (km)
  calories: number
  intensity?: string (low|medium|high)
  notes?: string
  timestamp: Date
  createdAt: Date
  updatedAt: Date
}
```

**Sample:**
```
Alice's morning run - 45 min, 8.5 km, 650 calories, High intensity
```

#### **Leaderboards**
Competitive rankings across multiple metrics.

```typescript
{
  userId: ObjectId (ref: User)
  teamId?: ObjectId (ref: Team)
  metric: string (calories|distance|activities|streaks|points)
  rank: number
  value: number
  updatedAt: Date
}
```

**Metrics:**
- `calories` - Total calories burned
- `distance` - Total distance covered
- `activities` - Number of activities logged
- `streaks` - Consecutive activity days
- `points` - Gamification points

**Sample Rankings:**
```
Global Calories Leaderboard:
1. Emma Davis (21,450 cal)
2. David Williams (19,200 cal)
3. Bob Smith (18,650 cal)
```

#### **Workouts**
Pre-defined workout templates for suggestions and planning.

```typescript
{
  name: string
  description: string
  type: string (strength|cardio|flexibility|mixed|hiit|yoga|pilates|other)
  difficulty: string (beginner|intermediate|advanced)
  duration: number (minutes)
  estimatedCalories: number
  exercises: {
    name: string
    reps?: number
    sets?: number
    duration?: number
  }[]
  targetMuscles?: string[]
  equipmentNeeded?: string[]
  createdBy?: ObjectId (ref: User)
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

**Sample Workouts:**
```
1. Morning HIIT Blast (30 min, 450 cal) - Intermediate
2. Strength Builder (60 min, 650 cal) - Advanced
3. Yoga Flow for Beginners (45 min, 200 cal) - Beginner
```

## Mongoose Models

All models are located in `src/models/`:

```
src/models/
├── User.ts           # User profile model
├── Team.ts           # Team management model
├── Activity.ts       # Activity logging model
├── Leaderboard.ts    # Leaderboard rankings model
├── Workout.ts        # Workout templates model
└── index.ts          # Exports all models
```

### Usage in Routes

```typescript
import { User, Team, Activity, Leaderboard, Workout } from '../models/index.js';

// Create
const user = await User.create({ email, name, username });

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
const updated = await User.findByIdAndUpdate(id, data, { new: true });

// Delete
const deleted = await User.findByIdAndDelete(id);
```

## Data Relationships

```
User
  ├── created Teams (via createdBy)
  ├── belongs to Teams (via members[])
  ├── logs Activities
  └── has Leaderboard entries

Team
  ├── created by User
  ├── contains User members
  └── has team-specific Leaderboard entries

Activity
  ├── belongs to User
  └── contributes to User stats

Leaderboard
  ├── ranks Users
  ├── optional Team scope
  └── tracks multiple metrics

Workout
  ├── created by User (optional)
  └── suggested to Users
```

## API Integration

The data models power these API endpoints:

- `GET /api/users` - List all users
- `GET /api/activities` - List all activities
- `GET /api/teams` - List all teams
- `GET /api/workouts` - List all workout templates
- `GET /api/leaderboard` - Global leaderboard
- `GET /api/leaderboard/:metric` - Leaderboard by metric
- `GET /api/leaderboard/team/:teamId` - Team leaderboard

## Database Statistics

After seeding:

```
Database: octofit_db
├── Users: 5 documents
├── Teams: 3 documents
├── Activities: 8 documents
├── Workouts: 5 documents
└── Leaderboards: 17 documents
```

**Total:** 38 documents across all collections

## Sample Queries

### Get all users with their stats

```javascript
db.users.find({}, { name: 1, username: 1, totalCalories: 1, totalDistance: 1 })
```

### Get all activities for a specific user

```javascript
db.activities.find({ userId: ObjectId("...") }).sort({ timestamp: -1 })
```

### Get global leaderboard by calories

```javascript
db.leaderboards.find({ metric: "calories", teamId: null }).sort({ rank: 1 })
```

### Get team members with their stats

```javascript
db.teams.aggregate([
  { $match: { _id: ObjectId("...") } },
  { $lookup: { from: "users", localField: "members", foreignField: "_id", as: "memberDetails" } }
])
```

## Environment Configuration

Create a `.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/octofit_db
NODE_ENV=development
PORT=8000
```

## Indexes

Performance indexes are created automatically for:

```typescript
// Leaderboard queries
leaderboardSchema.index({ metric: 1, rank: 1 });
leaderboardSchema.index({ teamId: 1, metric: 1, rank: 1 });

// Unique constraints
userSchema: email, username unique
teamSchema: implicit on name
```

## Next Steps

1. **Authentication** - Add password hashing and JWT tokens
2. **Validation** - Add input validation middleware
3. **Pagination** - Add pagination to list endpoints
4. **Aggregations** - Create more complex statistics queries
5. **Real-time Updates** - Add WebSocket support for live leaderboards
6. **Data Backup** - Set up MongoDB backup strategies

## Troubleshooting

### MongoDB connection refused

```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running, start it
mongod --dbpath /data/db
```

### Collections are empty

```bash
# Re-run the seed script
npm run seed --prefix octofit-tracker/backend
```

### Model import errors

Ensure you're using ES modules (`.js` extensions in imports):

```typescript
// ✅ Correct
import { User } from '../models/User.js';

// ❌ Wrong
import { User } from '../models/User';
```

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Community](https://www.mongodb.com/community/)

# OctoFit Tracker Backend API

The Node.js + Express + TypeScript logic tier for the OctoFit Tracker multi-tier application.

## Quick Start

### Development

```bash
npm install --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/backend
```

The server will run on:
- **Localhost:** `http://localhost:8000`
- **GitHub Codespaces:** `https://{CODESPACE_NAME}-8000.app.github.dev`

### Test API

```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get all activities
curl http://localhost:8000/api/activities
```

## Setup

```bash
npm install --prefix octofit-tracker/backend
```

## Development

Start the development server:

```bash
npm run dev --prefix octofit-tracker/backend
```

The server will:
1. Connect to MongoDB on `localhost:27017` (database: `octofit_db`)
2. Detect environment (Codespaces or localhost)
3. Generate appropriate base URL
4. Listen on port 8000

**Output:**
```
✅ MongoDB connected successfully
📊 Database: octofit_db

🚀 OctoFit Tracker API Server
📍 Environment: GitHub Codespaces
📍 Server running at: https://codespace-name-8000.app.github.dev
✅ Health check: https://codespace-name-8000.app.github.dev/api/health
👥 Users API: https://codespace-name-8000.app.github.dev/api/users
⚡ Activities API: https://codespace-name-8000.app.github.dev/api/activities
```

## Production Build

Build the TypeScript to JavaScript:

```bash
npm run build --prefix octofit-tracker/backend
```

Start the production server:

```bash
npm start --prefix octofit-tracker/backend
```

## Database

Seed the database with test data:

```bash
npm run seed --prefix octofit-tracker/backend
```

This creates:
- 5 sample users with fitness profiles
- 3 teams with members
- 8 activities (logged workouts)
- 5 workout templates
- 17 leaderboard entries

## Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/octofit_db
CODESPACE_NAME=
FRONTEND_URL=http://localhost:5173
```

## Configuration

### Codespaces & Localhost Support

The API automatically detects your environment:

- **Codespaces:** Uses `https://{CODESPACE_NAME}-8000.app.github.dev`
- **Localhost:** Uses `http://localhost:8000`

See [CODESPACES_CONFIG.md](./CODESPACES_CONFIG.md) for detailed configuration.

## API Routes

### Health Check
- `GET /api/health` - Server health status

### Users API
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams API
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `POST /api/teams/:id/members` - Add member to team

### Activities API
- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `GET /api/activities/user/:userId` - Get activities for user
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard API
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/:metric` - Get leaderboard by metric
- `GET /api/leaderboard/team/:teamId` - Get team leaderboard
- `POST /api/leaderboard/update` - Update leaderboard entry

### Workouts API
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `GET /api/workouts/suggest/:userId` - Get personalized workout suggestions
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Testing Endpoints

### Using curl

```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Create a new user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe","username":"johndoe"}'

# Get all activities
curl http://localhost:8000/api/activities

# Get global leaderboard
curl http://localhost:8000/api/leaderboard

# Get leaderboard by metric (calories, distance, activities)
curl http://localhost:8000/api/leaderboard/calories
```

### Using curl with jq (Pretty Print)

```bash
# Format user data
curl http://localhost:8000/api/users | jq '.data[] | {name, username, totalCalories}'

# Format activity data
curl http://localhost:8000/api/activities | jq '.data[] | {type, duration, calories, intensity}'

# Format leaderboard
curl http://localhost:8000/api/leaderboard/calories | jq '.data[] | {rank, value}'
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Main Express server with Codespaces support
│   ├── config/
│   │   └── database.ts   # MongoDB connection
│   ├── models/           # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Team.ts
│   │   ├── Activity.ts
│   │   ├── Leaderboard.ts
│   │   ├── Workout.ts
│   │   └── index.ts
│   ├── routes/           # API route handlers
│   │   ├── users.ts
│   │   ├── teams.ts
│   │   ├── activities.ts
│   │   ├── leaderboard.ts
│   │   └── workouts.ts
│   └── scripts/
│       └── seed.ts       # Database seeding script
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (local)
├── .env.example          # Environment template
├── README.md             # This file
├── CODESPACES_CONFIG.md  # Codespaces configuration guide
├── DATA_TIER.md          # Database schema and models
└── CODESPACES_CONFIG.md  # Configuration guide
```

## Features

✅ **TypeScript Support** - Full type safety with Express and Node.js types
✅ **MongoDB + Mongoose** - Persistent data storage with validation
✅ **Codespaces Integration** - Automatic URL detection for GitHub Codespaces
✅ **CORS Enabled** - Configured for frontend on port 5173
✅ **REST API Routes** - Comprehensive endpoints for all features
✅ **Error Handling** - Global error middleware with detailed messages
✅ **Environment Config** - Flexible configuration via .env
✅ **Database Seeding** - Test data population script
✅ **Production Ready** - Build and deployment scripts included

## Documentation

- [CODESPACES_CONFIG.md](./CODESPACES_CONFIG.md) - Codespaces and localhost configuration
- [DATA_TIER.md](./DATA_TIER.md) - MongoDB schema and data models

## Troubleshooting

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
ps aux | grep mongod
```

### Port Already in Use
Use a different port:
```bash
PORT=3001 npm run dev --prefix octofit-tracker/backend
```

### CORS Error
Ensure frontend is running on port 5173:
- **Codespaces:** `https://{CODESPACE_NAME}-5173.app.github.dev`
- **Localhost:** `http://localhost:5173`

## Next Steps

1. [Set up frontend](../frontend/README.md)
2. Connect frontend to API endpoints
3. Implement user authentication (JWT)
4. Add request validation middleware
5. Deploy to production

## Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)

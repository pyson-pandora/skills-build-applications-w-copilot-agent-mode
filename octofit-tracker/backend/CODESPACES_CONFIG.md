# OctoFit Tracker - API Configuration Guide

## Environment Support

The OctoFit Tracker backend API is configured to run in both **GitHub Codespaces** and **localhost** environments with automatic URL detection.

## Backend Server Configuration

### Port Configuration
- **Default Port:** 8000
- **Configurable via:** `PORT` environment variable

```bash
# Use default port 8000
npm run dev

# Use custom port
PORT=3000 npm run dev
```

## URL Generation

The API automatically detects the environment and generates the appropriate base URL:

### GitHub Codespaces Mode
**Activation:** `CODESPACE_NAME` environment variable is present

**Generated URL:**
```
https://{CODESPACE_NAME}-8000.app.github.dev
```

**Example:**
```
https://automatic-adventure-xr59w7wr9g77f6xgw-8000.app.github.dev
```

### Localhost Mode
**Activation:** `CODESPACE_NAME` environment variable is NOT present

**Generated URL:**
```
http://localhost:8000
```

## CORS Configuration

The backend is configured with CORS support for the frontend on port 5173:

### Codespaces CORS
```
Origin: https://{CODESPACE_NAME}-5173.app.github.dev
```

### Localhost CORS
```
Origin: http://localhost:5173
```

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS  
**Allowed Headers:** Content-Type, Authorization

## Server Startup Process

1. **Load Environment Variables** - Read from `.env`
2. **Connect to MongoDB** - Establish database connection to `octofit_db`
3. **Initialize Express** - Set up middleware and routes
4. **Detect Environment** - Check `CODESPACE_NAME` variable
5. **Generate Base URL** - Create appropriate URL for environment
6. **Start Listening** - Begin accepting requests on port 8000

### Startup Output Example

**Codespaces:**
```
✅ MongoDB connected successfully
📊 Database: octofit_db

🚀 OctoFit Tracker API Server
📍 Environment: GitHub Codespaces
📍 Server running at: https://automatic-adventure-xr59w7wr9g77f6xgw-8000.app.github.dev
✅ Health check: https://automatic-adventure-xr59w7wr9g77f6xgw-8000.app.github.dev/api/health
👥 Users API: https://automatic-adventure-xr59w7wr9g77f6xgw-8000.app.github.dev/api/users
⚡ Activities API: https://automatic-adventure-xr59w7wr9g77f6xgw-8000.app.github.dev/api/activities
```

**Localhost:**
```
✅ MongoDB connected successfully
📊 Database: octofit_db

🚀 OctoFit Tracker API Server
📍 Environment: localhost
📍 Server running at: http://localhost:8000
✅ Health check: http://localhost:8000/api/health
👥 Users API: http://localhost:8000/api/users
⚡ Activities API: http://localhost:8000/api/activities
```

## API Endpoints

All endpoints are available at the generated base URL.

### Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "message": "OctoFit Tracker API is running",
  "timestamp": "2026-09-13T06:08:48.726Z"
}
```

### Users API
```bash
GET /api/users          # Get all users
GET /api/users/:id      # Get user by ID
POST /api/users         # Create user
PUT /api/users/:id      # Update user
DELETE /api/users/:id   # Delete user
```

**Example Response (GET /api/users):**
```json
{
  "message": "GET /api/users - Retrieve all users",
  "count": 5,
  "data": [
    {
      "_id": "6aa63c70a8a5ecf5f9887da2",
      "email": "alice@example.com",
      "name": "Alice Johnson",
      "username": "alice_fit",
      "bio": "Marathon runner and fitness enthusiast",
      "totalCalories": 15420,
      "totalDistance": 245.5,
      "totalActivities": 48,
      "createdAt": "2026-09-13T06:02:24.268Z",
      "updatedAt": "2026-09-13T06:02:24.268Z"
    }
  ]
}
```

### Activities API
```bash
GET /api/activities           # Get all activities
GET /api/activities/:id       # Get activity by ID
GET /api/activities/user/:userId  # Get user activities
POST /api/activities          # Log new activity
PUT /api/activities/:id       # Update activity
DELETE /api/activities/:id    # Delete activity
```

**Example Response (GET /api/activities):**
```json
{
  "message": "GET /api/activities - Retrieve all activities",
  "count": 8,
  "data": [
    {
      "_id": "6aa63c8f45e2be905a444512",
      "userId": "6aa63c70a8a5ecf5f9887da2",
      "type": "running",
      "duration": 45,
      "distance": 8.5,
      "calories": 650,
      "intensity": "high",
      "notes": "Morning run in the park",
      "timestamp": "2026-09-11T06:02:24.321Z"
    }
  ]
}
```

### Teams API
```bash
GET /api/teams              # Get all teams
GET /api/teams/:id          # Get team by ID
POST /api/teams             # Create team
PUT /api/teams/:id          # Update team
DELETE /api/teams/:id       # Delete team
POST /api/teams/:id/members # Add member to team
```

### Leaderboard API
```bash
GET /api/leaderboard              # Get global leaderboard
GET /api/leaderboard/:metric      # Get leaderboard by metric
GET /api/leaderboard/team/:teamId # Get team leaderboard
POST /api/leaderboard/update      # Update leaderboard entry
```

### Workouts API
```bash
GET /api/workouts              # Get all workouts
GET /api/workouts/:id          # Get workout by ID
GET /api/workouts/suggest/:userId # Get suggestions
POST /api/workouts             # Create workout
PUT /api/workouts/:id          # Update workout
DELETE /api/workouts/:id       # Delete workout
```

## Testing Endpoints

### Using curl (Localhost)

```bash
# Health check
curl http://localhost:8000/api/health

# Get all users
curl http://localhost:8000/api/users

# Get all activities
curl http://localhost:8000/api/activities

# Get activities for specific user
curl http://localhost:8000/api/activities/user/{userId}

# Get global leaderboard
curl http://localhost:8000/api/leaderboard

# Get leaderboard by metric (calories, distance, activities)
curl http://localhost:8000/api/leaderboard/calories

# Get all teams
curl http://localhost:8000/api/teams

# Get all workouts
curl http://localhost:8000/api/workouts
```

### Using curl (Codespaces)

```bash
# Replace {CODESPACE_NAME} with actual value
BASE_URL="https://{CODESPACE_NAME}-8000.app.github.dev"

# Health check
curl ${BASE_URL}/api/health

# Get all users
curl ${BASE_URL}/api/users

# Get all activities
curl ${BASE_URL}/api/activities
```

### Using curl with jq (Pretty Print)

```bash
# Get and format users data
curl http://localhost:8000/api/users | jq '.data[] | {name, username, totalCalories}'

# Get and format activities data
curl http://localhost:8000/api/activities | jq '.data[] | {type, duration, calories, intensity}'

# Get leaderboard by metric
curl http://localhost:8000/api/leaderboard/calories | jq '.data[] | {rank, value}'
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/octofit_db

# Codespaces (automatically set by GitHub)
CODESPACE_NAME=

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## Development Workflow

### Start Development Server
```bash
npm run dev
```

This will:
1. Connect to MongoDB
2. Detect environment (Codespaces or localhost)
3. Generate appropriate base URL
4. Start listening on port 8000

### Build TypeScript
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

### Seed Database
```bash
npm run seed
```

## Database Connection

The API automatically connects to MongoDB on startup:

- **Connection String:** `mongodb://localhost:27017/octofit_db`
- **Database Name:** `octofit_db`
- **Auto-reconnect:** Enabled
- **Connection Timeout:** Configured via Mongoose defaults

### Connection Status

You can check MongoDB connection status by calling the health endpoint:

```bash
curl http://localhost:8000/api/health
```

If MongoDB is connected, the API will respond successfully.

## Frontend Integration

### Codespaces
The frontend should connect to:
```
https://{CODESPACE_NAME}-8000.app.github.dev
```

### Localhost
The frontend should connect to:
```
http://localhost:8000
```

The API is configured with CORS to accept requests from the frontend on port 5173.

## Troubleshooting

### Connection Refused
```
Error: ECONNREFUSED
```

**Solution:** Ensure MongoDB is running:
```bash
ps aux | grep mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE :::8000
```

**Solution:** Use different port:
```bash
PORT=3001 npm run dev
```

### CORS Error
```
Cross-Origin Request Blocked
```

**Solution:** Ensure frontend is on correct port:
- Codespaces: Port 5173 (frontend will be on `https://{CODESPACE_NAME}-5173.app.github.dev`)
- Localhost: Port 5173 (frontend will be on `http://localhost:5173`)

### MongoDB Connection Error
```
MongoDB connection error
```

**Solution:** Verify connection string in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/octofit_db
```

## API Response Format

All successful responses follow this format:

```json
{
  "message": "Description of the operation",
  "count": 5,
  "data": []
}
```

Error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Performance

The API is optimized for:
- **Concurrent Requests:** Handles multiple simultaneous requests
- **Database Queries:** Indexed collections for fast lookups
- **Response Time:** Sub-millisecond response times for cached data
- **Scalability:** Ready for production deployment

## Security Notes

- CORS is configured for frontend-backend communication
- Input validation is performed at the Mongoose schema level
- Error messages are sanitized before sending to client
- Sensitive fields are excluded from responses where appropriate

## Next Steps

1. Connect frontend to API endpoints
2. Implement authentication (JWT tokens)
3. Add request validation middleware
4. Deploy to production (scale MongoDB, add caching)
5. Monitor API performance and response times

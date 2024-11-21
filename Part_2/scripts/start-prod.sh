#!/bin/bash

# Navigate to the frontend directory
cd ../frontend

# Build frontend React app
npm run build

# Move back to backend
cd ../backend

# Start backend server in production
node server.js

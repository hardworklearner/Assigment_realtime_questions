#!/bin/bash

# Navigate to the backend directory
cd "$(dirname "$0")/../backend" || {
  echo "Backend directory not found"
  exit 1
}

# Start backend server with nodemon
npx nodemon server.js &

# Navigate to the frontend directory
cd "$(dirname "$0")/../frontend" || {
  echo "Frontend directory not found"
  exit 1
}

# Start frontend React server
npm start

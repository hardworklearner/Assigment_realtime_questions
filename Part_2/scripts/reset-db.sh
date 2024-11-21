#!/bin/bash

# Truncate tables
echo "Truncating all tables..."
psql -U postgres -d quizdb -c "TRUNCATE TABLE scores, quizzes, users RESTART IDENTITY CASCADE;"

# Run seed data
echo "Running seed data..."
psql -U postgres -d quizdb -f database/seed.sql

echo "Database reset and seeded successfully."

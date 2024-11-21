#!/bin/bash

# Set the filename with the current date and time
FILENAME="backup_$(date +%Y%m%d%H%M%S).sql"

# Run the PostgreSQL backup command
pg_dump -U $DB_USER -h $DB_HOST -d $DB_NAME >../database/$FILENAME

echo "Database backup saved to ../database/$FILENAME"

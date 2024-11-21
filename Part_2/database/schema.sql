-- Create User table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Quiz table
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  quizId INT NOT NULL,
  questionText TEXT NOT NULL,
  points INT DEFAULT 1,
  correctAnswer VARCHAR(255) NOT NULL,
  FOREIGN KEY (quizId) REFERENCES Quizzes(id)
);

CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  quizId INT NOT NULL,
  userId INT NOT NULL,
  score INT DEFAULT 0,
  FOREIGN KEY (quizId) REFERENCES Quizzes(id)
);

CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_quizId ON quizzes(id);

-- Seed data for Users
INSERT INTO "users" (username, password, "createdAt", "updatedAt") VALUES
('user1', '$2b$10$gucAMK6zEUjtl2YV.GbhRuAEker40PWafs.Sc2OfoPyi78bnxq.Dm', NOW(), NOW()),
('user2', '$2b$10$mX2UT52ssGfjkpmXcIa/ZuwXb0MKoF3Tf6PJ6x6l8tlj3oOW24brG', NOW(), NOW());

-- Seed data for Quizzes
-- Insert Quizzes
INSERT INTO "quizzes" ("title", "description", "createdAt", "updatedAt") VALUES
  ('General Knowledge', 'A quiz to test your general knowledge',NOW(), NOW()),
  ('Programming Basics', 'Questions about basic programming concepts', NOW(), NOW()),
  ('System Design', 'System design interview questions, focusing on cloud technologies such as AWS, Google Cloud, and Aruze', NOW(), NOW()),
  ('World Capitals', 'Identify the capitals of different countries', NOW(), NOW());

-- Insert Questions for 'General Knowledge' (3 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'General Knowledge'), 'What is the capital of France?', '{"A": "Berlin", "B": "Madrid", "C": "Paris", "D": "Rome"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'General Knowledge'), 'What is the largest continent?', '{"A": "Africa", "B": "Asia", "C": "Europe", "D": "North America"}', 'B', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'General Knowledge'), 'Which planet is known as the Red Planet?', '{"A": "Mars", "B": "Earth", "C": "Venus", "D": "Jupiter"}', 'A', 10, NOW(), NOW());

-- Insert Questions for 'Programming Basics' (2 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'Programming Basics'), 'Which of the following is a programming language?', '{"A": "HTML", "B": "CSS", "C": "Python", "D": "JPEG"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'Programming Basics'), 'What does CSS stand for?', '{"A": "Cascading Style Sheets", "B": "Computer Style Sheets", "C": "Creative Style Sheets", "D": "Cascading Style Scripts"}', 'A', 10,  NOW(), NOW());
-- Insert Questions for 'System Design' (20 questions about cloud technologies)
-- AWS Questions (5 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is AWS S3 used for?', '{"A": "Compute", "B": "Storage", "C": "Networking", "D": "Databases"}', 'B', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is the purpose of AWS Lambda?', '{"A": "Serverless Computing", "B": "Cloud Storage", "C": "Content Delivery", "D": "Identity and Access Management"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which AWS service is used for content delivery?', '{"A": "Amazon EC2", "B": "AWS Lambda", "C": "Amazon CloudFront", "D": "Amazon S3"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which AWS service provides managed Kubernetes?', '{"A": "Amazon EKS", "B": "AWS Fargate", "C": "Amazon EC2", "D": "AWS Lambda"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which AWS service is used for relational databases?', '{"A": "Amazon RDS", "B": "Amazon Aurora", "C": "Amazon DynamoDB", "D": "Amazon Redshift"}', 'A', 10,  NOW(), NOW());

-- Google Cloud Questions (5 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is the primary service used in Google Cloud for compute?', '{"A": "Google Compute Engine", "B": "Google Kubernetes Engine", "C": "App Engine", "D": "Google Cloud Functions"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is Google Cloud’s managed Kubernetes service?', '{"A": "Google Cloud Functions", "B": "Google App Engine", "C": "Google Kubernetes Engine", "D": "Google Compute Engine"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is the service in Google Cloud for object storage?', '{"A": "Google Cloud Storage", "B": "Google Cloud SQL", "C": "BigQuery", "D": "Google Datastore"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which Google Cloud product is a fully managed NoSQL database?', '{"A": "Cloud SQL", "B": "Google Cloud Spanner", "C": "Google Cloud Datastore", "D": "Bigtable"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which Google service is used for monitoring and logging?', '{"A": "Google Stackdriver", "B": "Google Analytics", "C": "Google Cloud Trace", "D": "Cloud Monitoring"}', 'A', 10,  NOW(), NOW());

-- Aruze Questions (5 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'What is Aruze’s primary cloud service?', '{"A": "Aruze Cloud", "B": "Aruze K8s", "C": "Aruze Cloud Functions", "D": "Aruze Compute Engine"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which of the following is a key component of Aruze Cloud?', '{"A": "Compute", "B": "Networking", "C": "Storage", "D": "Identity and Access Management"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Aruze cloud integrates which of the following?', '{"A": "Google Cloud", "B": "AWS", "C": "Microsoft Azure", "D": "None of the above"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which service of Aruze offers managed Kubernetes?', '{"A": "Aruze Kubernetes Service", "B": "Aruze Compute", "C": "Aruze Functions", "D": "Aruze Monitoring"}', 'A', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'System Design'), 'Which of these is a managed service for Aruze Cloud storage?', '{"A": "Aruze Object Storage", "B": "Aruze Compute", "C": "Aruze Functions", "D": "Aruze Bigtable"}', 'A', 10,  NOW(), NOW());

-- Insert Questions for 'World Capitals' (2 questions)
INSERT INTO "questions" ("quizId", "questionText", "answerList", "correctAnswer", "points", "createdAt", "updatedAt") VALUES
  ((SELECT id FROM quizzes WHERE title = 'World Capitals'), 'What is the capital of France?', '{"A": "Berlin", "B": "Madrid", "C": "Paris", "D": "Rome"}', 'C', 10, NOW(), NOW()),
  ((SELECT id FROM quizzes WHERE title = 'World Capitals'), 'What is the capital of Japan?', '{"A": "Beijing", "B": "Seoul", "C": "Tokyo", "D": "Bangkok"}', 'C', 10, NOW(), NOW());

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 }, // Ramp up to 50 users over 1 minute
    { duration: "2m", target: 200 }, // Stay at 200 users for 2 minutes
    { duration: "1m", target: 0 }, // Ramp down to 0 users over 1 minute
  ],
};

const BASE_URL = "http://localhost:3000/api"; // Replace with your API base URL
const QUIZ_ID = 1; // Replace with the actual quiz ID you want to test

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Define the character set
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Random index
    result += characters[randomIndex];
  }
  return result;
}

export default function () {
  // Generate random user credentials
  const username = `user_test_${generateRandomString(5)}`;
  const password = `password_${generateRandomString(5)}`;

  // Step 1: Sign up a user
  let signupRes = http.post(
    `${BASE_URL}/auth/signup`,
    JSON.stringify({
      username: username,
      password: password,
      confirmPassword: password, // Added confirmPassword field
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(signupRes, {
    "Signup successful": (r) => r.status === 201,
  });

  // If signup fails, abort this iteration
  if (signupRes.status !== 201) {
    console.error(`Signup failed for ${username}`);
    return;
  }

  // Step 2: Log in the user
  let loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({
      username: username,
      password: password,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  check(loginRes, {
    "Login successful": (r) =>
      r.status === 200 && r.json("token") !== undefined,
  });

  const token = loginRes.json("token");
  if (!token) {
    console.error(`Login failed for ${username}`);
    return;
  }

  // Step 3: Join a quiz
  let joinQuizRes = http.post(`${BASE_URL}/quizzes/join/${QUIZ_ID}`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(joinQuizRes, {
    "Quiz joined successfully": (r) => r.status === 200,
  });

  // Step 4: Answer a question
  const QUESTION_ID = 1; // Replace with an actual question ID
  let answerRes = http.post(
    `${BASE_URL}/quizzes/${QUIZ_ID}/questions/${QUESTION_ID}/answer`,
    JSON.stringify({
      userAnswer: "A", // Replace with a valid answer
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  check(answerRes, {
    "Answer submitted successfully": (r) => r.status === 200,
  });

  // Simulate user think time
  sleep(1);
}

# Creating a README file for the backend in text format.

# Quiz Platform Backend

This is the backend implementation for the Quiz Platform. It provides a REST API for user authentication, quiz management, real-time leaderboard updates, and answer submissions. The backend is implemented using **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM**.

---

## **Features**

- **User Management**
  - Signup, login, and authentication using JWT.
- **Quiz Management**
  - Create, update, and fetch quizzes and their questions.
- **Answer Submission**
  - Validate user answers and calculate scores.
- **Real-Time Leaderboard**
  - Real-time leaderboard updates using **Socket.IO**.
- **Caching**
  - Redis integration for caching frequently queried data.
- **Rate Limiting**
  - Protect endpoints from excessive requests.
- **Monitoring**
  - Prometheus-style metrics for performance monitoring.
- **Health Check**
  - API health check endpoint.

---

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Caching**: Redis
- **WebSocket**: Socket.IO
- **Monitoring**: Prometheus Metrics
- **Testing**: Jest, K6 (Load Testing)

---

## **Setup and Installation**

### Prerequisites:

1. **Node.js** (v14+)
2. **PostgreSQL**
3. **Redis**
4. **NPM/Yarn**

### Steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables: Create a `.env` file with the following:

```txt
PORT=3000
DATABASE_URL=<Your_PostgreSQL_URL>
JWT_SECRET=<Your_Secret_Key>
REDIS_HOST=localhost
REDIS_PORT=6379
```

4. Run migrations:

```bash


psql -U postgres -d quizdb -f database/schema.sql
psql -U postgres -d quizdb -f database/seed.sql
```

```bash
npx sequelize-cli db:migrate
```

5. Seed database:

```bash
npx sequelize-cli db:seed:all
```

6. Start the server:

```bash
npm start
```

7. Run tests

```bash
k6 run load_test.js
```

## **Endpoints**

### **Auth**

- **POST** `/api/auth/signup` - User signup
- **POST** `/api/auth/login` - User login

### **Quizzes**

- **GET** `/api/quizzes` - Fetch all quizzes
- **GET** `/api/quizzes/:quizId` - Fetch a specific quiz
- **POST** `/api/quizzes/join/:quizId` - Join a quiz
- **GET** `/api/quizzes/:quizId/questions` - Fetch questions for a quiz
- **POST** `/api/quizzes/:quizId/questions/:questionId/answer` - Submit an answer

### **Leaderboard**

- **GET** `/api/leaderboard/:quizId` - Fetch leaderboard for a quiz

### **Monitoring**

- **GET** `/metrics` - Prometheus-style metrics

### **Health**

- **GET** `/health` - API health check

## **WebSocket Events**

### **Client-to-Server Events**

- **`joinQuiz`**: Join a quiz room.
- **`leaveQuiz`**: Leave a quiz room.
- **`updateScore`**: Notify server of score updates.

### **Server-to-Client Events**

- **`leaderboardUpdate`**: Real-time leaderboard update.

## **Contribution Guidelines**

1.  Fork the repository.
2.  Create a feature branch.
3.  Submit a pull request with detailed explanations.

## **License**

This project is licensed under the MIT License.

## **Contact**

For any queries, please contact [hardworkenglishlearner@gmail.com].

````json
{
  "info": {
    "name": "Quiz Platform API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"user1\",\n  \"password\": \"password123\",\n  \"confirmPassword\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/auth/signup",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "signup"]
            }
          },
          "response": []
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"user1\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/auth/login",
              "host": ["{{base_url}}"],
              "path": ["api", "auth", "login"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Quizzes",
      "item": [
        {
          "name": "Get All Quizzes",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/api/quizzes",
              "host": ["{{base_url}}"],
              "path": ["api", "quizzes"]
            }
          },
          "response": []
        },
        {
          "name": "Join Quiz",
          "request": {
            "method": "POST",
            "url": {
              "raw": "{{base_url}}/api/quizzes/join/:quizId",
              "host": ["{{base_url}}"],
              "path": ["api", "quizzes", "join", ":quizId"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Leaderboard",
      "item": [
        {
          "name": "Fetch Leaderboard",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/api/leaderboard/:quizId",
              "host": ["{{base_url}}"],
              "path": ["api", "leaderboard", ":quizId"]
            }
          },
          "response": []
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    }
  ]
}
````

### **How to Use**

1.  Import the JSON file into Postman:
    - Open Postman > Import > Upload the file.
2.  Update the `base_url` variable if necessary.
3.  Test the API endpoints directly.

const request = require("supertest");
const app = require("../server"); // Adjust the path based on your server setup
const { sequelize } = require("../models"); // Sequelize to interact with DB

describe("Auth Routes", () => {
  // Before each test, we clear the database
  beforeEach(async () => {
    await sequelize.sync({ force: true }); // Drop and re-sync the DB before each test
  });

  // Test for Signup
  describe("POST /auth/signup", () => {
    it("should create a new user and return a token", async () => {
      const userData = {
        username: "john_doe",
        password: "password123",
        confirmPassword: "password123",
      };

      const response = await request(app).post("/auth/signup").send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("userName", userData.username);
    });

    it("should return an error if passwords don't match", async () => {
      const userData = {
        username: "john_doe",
        password: "password123",
        confirmPassword: "password124",
      };

      const response = await request(app).post("/auth/signup").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Passwords do not match");
    });

    it("should return an error if username already exists", async () => {
      const userData = {
        username: "john_doe",
        password: "password123",
        confirmPassword: "password123",
      };

      // Create the first user
      await request(app).post("/auth/signup").send(userData);

      // Try to create the same user again
      const response = await request(app).post("/auth/signup").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Username already exists");
    });
  });

  // Test for Login
  describe("POST /auth/login", () => {
    it("should log in and return a token", async () => {
      const userData = {
        username: "john_doe",
        password: "password123",
      };

      // First, create the user
      await request(app)
        .post("/auth/signup")
        .send({
          ...userData,
          confirmPassword: userData.password,
        });

      // Then login with the same user
      const response = await request(app).post("/auth/login").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("userName", userData.username);
    });

    it("should return an error if invalid credentials", async () => {
      const userData = {
        username: "john_doe",
        password: "wrongpassword",
      };

      const response = await request(app).post("/auth/login").send(userData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
  });
});

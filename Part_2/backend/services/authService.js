const User = require("../models/User"); // Adjust path if necessary
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");
const logger = require("./loggerService");

class AuthService {
  static async login(req, res) {
    const { username, password } = req.body;
    console.log("Login attempt:");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const user = await User.findOne({ where: { username } });
      // console.log("User found:", user);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      logger.info("User logged in", { userId: user.id });
      // Response in authService.js after login success
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "12h",
      });
      return res.json({ token, userId: user.id, userName: user.username });
    } catch (error) {
      console.error("Error in login:", error);
      logger.error("An error occurred", error);

      return res.status(500).json({ error: "Server error" });
    }
  }

  static async signup(req, res) {
    const { username, password, confirmPassword } = req.body;

    // Step 1: Validate if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
      // Step 2: Check if username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Step 3: Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Step 4: Create the new user
      const user = await User.create({ username, password: hashedPassword });

      // Step 5: Generate JWT token after successful registration
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "12h",
      });

      logger.info("New User signed up", {
        userName: user.username,
        userId: user.id,
      });
      // Step 6: Send response with user details and token
      return res
        .status(201)
        .json({ token, userId: user.id, userName: user.username });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = AuthService;

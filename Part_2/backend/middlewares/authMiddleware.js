// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Authorization: Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const secretKey = process.env.JWT_SECRET || "abcedf"; // Replace with your actual secret
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);
    // Attach the user ID to the request object
    req.userId = decoded.userId;

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;

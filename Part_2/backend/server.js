const express = require("express");
const cors = require("cors");
const http = require("http");
const setupWebSocket = require("./websockets/websocket");
const authRoutes = require("./api/auth");
const quizRoutes = require("./api/quiz");
const leaderboardRoutes = require("./api/leaderboard");
const { PORT } = require("./config/env");
const sequelize = require("./config/dbConfig");
const {
  monitorMiddleware,
  register,
} = require("./middlewares/monitorMiddleware");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2000, // limit each IP to 2000 requests per windowMs
  standardHeaders: true, // Return rate-limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});

const app = express();
const server = http.createServer(app);

// Middleware for performance monitoring
app.use(monitorMiddleware);
app.get("/api/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Enable CORS with necessary configurations
app.use(
  cors({
    origin: "http://localhost:3001", // Update to match your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Use rate limiter
// app.use(limiter);

// Parse incoming JSON requests
app.use(express.json());

// Route definitions
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.get("/api/health", async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();

    res.status(200).json({
      status: "UP",
      uptime: process.uptime(),
      database: "Connected",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Health check failed:", error.message);
    res.status(500).json({
      status: "DOWN",
      error: error.message,
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  }
});

// Setup WebSocket for real-time features
const io = setupWebSocket(server);
app.set("io", io); // Attach the WebSocket instance to the app for shared use

// Sync database schema and start the server
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

// Utility to print all available routes
function printRoutes(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(
      printRoutes.bind(null, path.concat(splitPath(layer.route.path)))
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      printRoutes.bind(null, path.concat(splitPath(layer.regexp)))
    );
  } else if (layer.method) {
    console.log(
      "%s /%s",
      layer.method.toUpperCase(),
      path.concat(splitPath(layer.regexp)).filter(Boolean).join("/")
    );
  }
}

function splitPath(thing) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    const match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : `<complex:${thing.toString()}>`;
  }
}

// Print all defined routes for debugging purposes
app._router.stack.forEach(printRoutes.bind(null, []));

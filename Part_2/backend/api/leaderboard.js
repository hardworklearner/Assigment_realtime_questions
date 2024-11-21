// api/leaderboard.js
const express = require("express");
const router = express.Router();
const LeaderboardService = require("../services/leaderboardService");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
// Route to get the leaderboard for a specific quiz
router.get("/:quizId", async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const leaderboard = await LeaderboardService.getLeaderboard(quizId);
    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});

module.exports = router;

const CacheService = require("./cacheService");
const Score = require("../models/Score");
const User = require("../models/User");
const Quiz = require("../models/Quiz");

class LeaderboardService {
  static async getLeaderboard(quizId) {
    const cacheKey = `leaderboard:${quizId}`;

    // Check Redis cache for leaderboard data
    let leaderboard = await CacheService.get(cacheKey);
    if (leaderboard) {
      console.log("Cache hit for leaderboard:", quizId);
      // return leaderboard;
    }

    // Fetch leaderboard from the database
    leaderboard = await Score.findAll({
      attributes: [
        "userId",
        [Score.sequelize.fn("SUM", Score.sequelize.col("score")), "totalScore"],
      ],
      where: { quizId },
      include: [{ model: User, attributes: ["username"], as: "user" }],
      group: ["userId", "user.id"],
      order: [
        [Score.sequelize.fn("SUM", Score.sequelize.col("score")), "DESC"],
      ], // Use SUM in order clause
      limit: 100,
    });

    // Format leaderboard data
    leaderboard = leaderboard.map((entry) => ({
      username: entry.user.username,
      totalScore: entry.getDataValue("totalScore"),
    }));

    // Cache the leaderboard
    await CacheService.set(cacheKey, leaderboard, 300);

    return leaderboard;
  }

  static async updateLeaderboard(quizId) {
    // Clear cached leaderboard to force a refresh on next request
    const cacheKey = `leaderboard:${quizId}`;
    await CacheService.delete(cacheKey);
  }

  static async updateScore(quizId, userId, questionId, score) {
    const cacheKey = `leaderboard:${quizId}`;

    // // Update Score in Database
    // const userScore = await Score.findOne({
    //   where: { quizId, questionId, userId },
    // });

    // if (userScore) {
    //   // Update existing score
    //   userScore.score += score;
    //   await userScore.save();
    // } else {
    //   // Create new score
    //   await Score.create({ quizId, userId, questionId, score });
    // }

    // Clear the cache to refresh the leaderboard
    await CacheService.delete(cacheKey);
  }
}

module.exports = LeaderboardService;

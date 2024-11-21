const Quiz = require("../models/Quiz");
const CacheService = require("./cacheService");
const Score = require("../models/Score");
const Question = require("../models/Question");
const LeaderboardService = require("./leaderboardService");
const logger = require("./loggerService");

class QuizService {
  static async getQuiz(quizId) {
    const cacheKey = `quiz:${quizId}`;
    let quiz = await CacheService.get(cacheKey);
    if (quiz) {
      console.log(`Cache hit for quiz ID ${quizId}`);
      return quiz;
    }

    quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      throw new Error(`Quiz with ID ${quizId} not found.`);
    }

    await CacheService.set(cacheKey, quiz);
    return quiz;
  }

  static async getAllQuizzes() {
    const cacheKey = "quizzes:all";
    const cacheTTL = 300;

    let quizzes = await CacheService.get(cacheKey);
    if (quizzes) {
      console.log("Cache hit for all quizzes");
      return quizzes;
    }

    quizzes = await Quiz.findAll();
    if (!quizzes.length) {
      console.warn("No quizzes found in the database.");
    }

    await CacheService.set(cacheKey, quizzes, cacheTTL);
    return quizzes;
  }

  static async joinQuiz(quizId, userId) {
    try {
      const isUserInQuiz = await QuizService.isUserInQuiz(quizId, userId);
      if (isUserInQuiz) {
        console.log(`User ${userId} is already in quiz ${quizId}`);
        return;
      }

      const questions = await Question.findAll({ where: { quizId } });
      if (!questions.length) {
        throw new Error(`No questions found for quiz ID ${quizId}`);
      }

      const scoreEntries = questions.map((question) => ({
        quizId,
        userId,
        questionId: question.id,
        score: 0,
      }));

      await Score.bulkCreate(scoreEntries);
      logger.info("User joined quiz", { quizId: quizId, userId: userId });
      console.log(`User ${userId} joined quiz ${quizId}`);
    } catch (error) {
      console.error("Error joining quiz:", error.message);
      throw error;
    }
  }

  static async submitAnswer(quizId, questionId, userId, userAnswer, io) {
    try {
      // Validate inputs
      if (!quizId || !questionId || !userId) {
        throw new Error(
          "Missing required parameters: quizId, questionId, or userId."
        );
      }

      // Fetch Question
      const question = await Question.findByPk(questionId);
      if (!question) {
        throw new Error(`Question ID ${questionId} not found.`);
      }

      // Determine score change
      const isCorrect = userAnswer === question.correctAnswer;
      const points = isCorrect ? question.points : 0;

      // Log details for debugging
      console.log(
        `Quiz ID: ${quizId}, Question ID: ${questionId}, User ID: ${userId}`
      );
      console.log(
        `User Answer: ${userAnswer}, Correct Answer: ${question.correctAnswer}`
      );
      console.log(`Points Awarded: ${points}`);

      const userScore = await Score.findOne({
        where: { quizId, questionId, userId },
      });

      if (!userScore) {
        // Update existing score
        await Score.create({
          quizId,
          userId,
          questionId,
          score: 0,
        });
      }
      // Update score entry
      const [updatedCount] = await Score.update(
        {
          score: points,
          answer: userAnswer,
        },
        {
          where: { quizId, userId, questionId },
          logging: console.log,
        }
      );

      if (!updatedCount) {
        throw new Error(
          `Failed to update score for User ID ${userId}, Quiz ID ${quizId}, Question ID ${questionId}`
        );
      }

      console.log(
        `Score updated for User ${userId} in Quiz ${quizId}, Question ${questionId}`
      );
      // Fetch updated leaderboard
      const leaderboard = await LeaderboardService.getLeaderboard(quizId);

      // Emit real-time leaderboard update
      if (io) {
        io.to(`quiz-${quizId}`).emit("leaderboardUpdate", leaderboard);
      } else {
        console.error("Socket.io instance is not available.");
      }

      logger.info("User answer a question", {
        isCorrect: isCorrect,
        points: points,
        quizId: quizId,
        questionId: questionId,
        userId: userId,
        answer: userAnswer,
      });
      return { isCorrect, points };
    } catch (error) {
      console.error("Error submitting answer:", error.message);
      throw error;
    }
  }

  static async isUserInQuiz(quizId, userId) {
    try {
      const existingEntry = await Score.findOne({ where: { quizId, userId } });
      return !!existingEntry;
    } catch (error) {
      console.error("Error checking user in quiz:", error.message);
      throw error;
    }
  }
}

module.exports = QuizService;

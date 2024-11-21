const express = require("express");
const QuizService = require("../services/quizService");
const router = express.Router();
const Question = require("../models/Question");
const authMiddleware = require("../middlewares/authMiddleware");
const LeaderboardService = require("../services/leaderboardService");

router.use(authMiddleware);

// get quiz info
router.get("/:quizId", async (req, res) => {
  try {
    const quiz = await QuizService.getQuiz(req.params.quizId);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// fetch all quizzes
router.get("", async (req, res) => {
  try {
    console.log("Fetching quizzes...");
    const quizzes = await QuizService.getAllQuizzes();
    // console.log("Quizzes fetched:", quizzes);
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// join quiz
router.post("/join/:quizId", async (req, res) => {
  try {
    console.log("Joining quiz...");
    const quizId = req.params.quizId;
    const userId = req.userId;
    console.log("User ID:" + userId);

    // Check if the user is already in the quiz
    const isUserInQuiz = await QuizService.isUserInQuiz(quizId, userId);
    if (isUserInQuiz) {
      return res.status(200).json({ error: "User is already in the quiz" });
    }

    // Add user into the Quiz
    await QuizService.joinQuiz(quizId, userId);
    res.status(200).json({ message: "User joined the quiz" });
  } catch (error) {
    console.error("Error joining quiz:", error);
    res.status(500).json({ error: "Failed to join quiz" });
  }
});

// Get questions for a specific quiz
router.get("/:quizId/questions", async (req, res) => {
  try {
    const { quizId } = req.params;
    const questions = await Question.findAll({ where: { quizId } });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// submit an answer for question of quiz
router.post("/:quizId/questions/:questionId/answer", async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { userAnswer } = req.body;
    const userId = req.userId;

    console.log("User ID:" + userId);
    console.log("Question ID:" + questionId);
    // Fetch the question from the database
    const io = req.app.get("io"); // Get Socket.io instance

    if (!io) {
      throw new Error("Socket.io instance is not available in the request.");
    }
    // console.log(io);

    const result = await QuizService.submitAnswer(
      quizId,
      questionId,
      userId,
      userAnswer,
      io
    );

    let scoreChange = result.totalScore;

    // Update the user's score in the leaderboard
    await LeaderboardService.updateScore(
      quizId,
      userId,
      questionId,
      scoreChange
    );

    res.status(200).json({
      message: "Answer submitted successfully",
      totalScore: result.totalScore,
      isCorrect: result.isCorrect,
      points: result.points,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ error: "Failed to process answer" });
  }
});

module.exports = router;

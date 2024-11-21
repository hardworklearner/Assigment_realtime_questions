const { Server } = require("socket.io");
const LeaderboardService = require("../services/leaderboardService");

const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinQuiz", (quizId) => {
      socket.join(`quiz-${quizId}`);
      console.log(`User joined quiz room: quiz-${quizId}`);
    });

    socket.on("updateScore", async ({ quizId }) => {
      try {
        const leaderboard = await LeaderboardService.getLeaderboard(quizId);
        io.to(`quiz-${quizId}`).emit("leaderboardUpdate", leaderboard);
      } catch (err) {
        console.error("Error updating leaderboard via WebSocket:", err);
      }
    });

    socket.on("leaveQuiz", (quizId) => {
      socket.leave(`quiz-${quizId}`);
      console.log(`User left quiz room: quiz-${quizId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = setupWebSocket;

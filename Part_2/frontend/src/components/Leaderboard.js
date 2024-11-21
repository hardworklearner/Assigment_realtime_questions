// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { getLeaderboard } from "../services/api";

// Initialize socket outside of the component to prevent reconnections
const socket = io("http://localhost:3000");

const Leaderboard = ({ quizId, quizTitle }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch initial leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const response = await getLeaderboard(quizId);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Handle WebSocket updates
  const handleLeaderboardUpdate = (updatedLeaderboard) => {
    setLeaderboard(updatedLeaderboard);
  };

  useEffect(() => {
    // Fetch initial leaderboard data
    fetchLeaderboard();

    // Join the WebSocket room for real-time updates
    socket.emit("joinQuiz", quizId);
    socket.on("leaderboardUpdate", handleLeaderboardUpdate);

    // Clean up WebSocket listeners on component unmount
    return () => {
      socket.off("leaderboardUpdate", handleLeaderboardUpdate);
      socket.emit("leaveQuiz", quizId);
    };
  }, [quizId]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard for {quizTitle}</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <li key={index}>
              <strong>{index + 1}.</strong> {entry.username}:{" "}
              <span>{entry.totalScore} points</span>
            </li>
          ))
        ) : (
          <p>No participants yet. Be the first to join!</p>
        )}
      </ul>
    </div>
  );
};

// Define prop types for the component
Leaderboard.propTypes = {
  quizId: PropTypes.number.isRequired, // quizId should be a required number
  quizTitle: PropTypes.string.isRequired, // quizTitle should be a required string
};

export default Leaderboard;

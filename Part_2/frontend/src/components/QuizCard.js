import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const QuizCard = ({ quiz }) => {
  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <Link to={`/quiz/${quiz.id}`}>
        <button>Start Quiz</button>
      </Link>
    </div>
  );
};

QuizCard.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default QuizCard;

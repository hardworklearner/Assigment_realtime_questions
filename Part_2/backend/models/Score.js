const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");

const Score = sequelize.define(
  "Score",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing
    tableName: "scores", // Explicitly set the table name to lowercase
  }
);

Score.belongsTo(User, { foreignKey: "userId", as: "user" });
Score.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });
Score.belongsTo(Question, { foreignKey: "questionId", as: "question" });

User.hasMany(Score, { foreignKey: "userId", as: "scores" });
Quiz.hasMany(Score, { foreignKey: "quizId", as: "scores" });
Question.hasMany(Score, { foreignKey: "questionId", as: "scores" });

module.exports = Score;

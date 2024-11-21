const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Quiz = require("./Quiz");

const Question = sequelize.define(
  "Question",
  {
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: "id",
      },
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answerList: {
      type: DataTypes.JSON, // JSON type to store answer choices
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "questions", // Explicitly set table name to lowercase
  }
);

Question.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = Question;

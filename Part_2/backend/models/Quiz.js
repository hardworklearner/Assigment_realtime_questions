const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Quiz = sequelize.define(
  "Quiz",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    tableName: "quizzes", // Explicitly set table name to lowercase
  }
);

module.exports = Quiz;

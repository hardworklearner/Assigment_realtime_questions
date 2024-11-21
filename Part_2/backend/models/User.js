const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define(
  "User", // Model name
  {
    // Define model attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing
    tableName: "users", // Explicitly set the table name to lowercase
  }
);

module.exports = User;

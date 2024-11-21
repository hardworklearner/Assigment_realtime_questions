const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require("./env");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false, // Disable SQL query logs
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Database connected!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

module.exports = sequelize;

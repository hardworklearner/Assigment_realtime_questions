// __mocks__/models/index.js
const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
  id: 1,
  username: "testUser",
  password: "hashedPassword123",
});

const QuizMock = dbMock.define("Quiz", {
  id: 1,
  title: "General Knowledge",
  description: "Test your general knowledge.",
});

module.exports = {
  User: UserMock,
  Quiz: QuizMock,
  sequelize: dbMock,
};

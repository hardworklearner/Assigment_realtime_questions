// __mocks__/models.js
const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
  id: 1,
  username: "testUser",
  password: "$2b$10$hashedPasswordHere", // Mock bcrypt hash
});

module.exports = { User: UserMock };

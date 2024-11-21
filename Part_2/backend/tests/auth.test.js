const { User } = require("../__mocks__/models");
const AuthService = require("../services/authService");

describe("AuthService", () => {
  it("should successfully sign up a user", async () => {
    const req = { body: { username: "newUser", password: "password123" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await AuthService.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "newUser",
      })
    );
  });
});

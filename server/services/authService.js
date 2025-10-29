const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");

class AuthService {
  async login(data) {
    if (!data.username || !data.password) {
      const error = new Error("Bad request: missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const result = await authRepository.findByUsername(data);
    if (result.length === 0) {
      const error = new Error("Unauthorized: invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    const match = await bcrypt.compare(data.password, result[0]?.password);
    if (!match) {
      const error = new Error("Unauthorized: wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        user_id: result[0].id,
        username: result[0].username,
        role: result[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    return {
      user_id: result[0].id,
      username: result[0].username,
      token,
    };
  }
}

module.exports = new AuthService();

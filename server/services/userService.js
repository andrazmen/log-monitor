const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/userRepository");

class UserService {
  async createUser({ username, password, role, current_role }) {
    if (current_role !== "admin") {
      const error = new Error("Forbidden: only admin can add users");
      error.statusCode = 403;
      throw error;
    }
    if (!username || !password || !role) {
      const error = new Error("Bad request: missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);
    return await userRepository.add({ username, hashed_pass, role });
  }
}

module.exports = new UserService();

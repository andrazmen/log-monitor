const connectDB = require("../db/connection");

class AuthRepository {
  async findByUsername(data) {
    try {
      const [rows] = await connectDB.query(
        "SELECT id, username, password, role FROM users WHERE username = ?",
        [data.username]
      );
      return rows;
    } catch (err) {
      console.error("Database error in authRepository.findByUsername:", err);
      throw err;
    }
  }
}

module.exports = new AuthRepository();

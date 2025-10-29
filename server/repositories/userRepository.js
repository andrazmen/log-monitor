const connectDB = require("../db/connection");

class UserRepository {
  async add(data) {
    try {
      const [rows] = await connectDB.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [data.username, data.hashed_pass, data.role]
      );
      return rows;
    } catch (err) {
      console.error("Database error in userRepository.add:", err);
      throw err;
    }
  }
}

module.exports = new UserRepository();

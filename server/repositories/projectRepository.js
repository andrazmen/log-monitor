const connectDB = require("../db/connection");

class ProjectRepository {
  async findByUserId(user_id) {
    try {
      const [rows] = await connectDB.query(
        "SELECT id, name FROM projects WHERE created_by = ?",
        [user_id]
      );
      return rows;
    } catch (err) {
      console.error("Database error in projectRepository.findByUserId:", err);
      throw err;
    }
  }
  async add(data) {
    try {
      const [rows] = await connectDB.query(
        "INSERT INTO projects (name, created_by) VALUES (?, ?)",
        [data.name, data.user_id]
      );
      return rows;
    } catch (err) {
      console.error("Database error in projectRepository.add:", err);
      throw err;
    }
  }
}

module.exports = new ProjectRepository();

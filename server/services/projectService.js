const projectRepository = require("../repositories/projectRepository");

class ProjectService {
  async getProjects(user_id) {
    return await projectRepository.findByUserId(user_id);
  }
  async createProject(data) {
    if (!data.name || !data.user_id) {
      const error = new Error("Bad request: missing required fields");
      error.statusCode = 400;
      throw error;
    }
    if (data.user_id !== data.current_user_id) {
      const error = new Error(
        "Forbidden: you can only create projects for yourself"
      );
      error.statusCode = 403;
      throw error;
    }

    try {
      return await projectRepository.add(data);
    } catch (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        const error = new Error("Invalid user_id: user does not exist!");
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }
}

module.exports = new ProjectService();

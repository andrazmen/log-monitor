const logRepository = require("../repositories/logRepository");

class LogService {
  async getLogs(data) {
    return await logRepository.findAll(data);
  }
  async createLog(data) {
    if (
      !data.project_id ||
      !data.source ||
      !data.timestamp ||
      !data.severity ||
      !data.message
    ) {
      const error = new Error("Bad request: missing required fields");
      error.statusCode = 400;
      throw error;
    }
    const severities = [
      "EMERG",
      "ALERT",
      "CRIT",
      "ERR",
      "WARNING",
      "NOTICE",
      "INFO",
      "DEBUG",
    ];
    if (!severities.includes(data.severity)) {
      const error = new Error("Bad request: invalid severity");
      error.statusCode = 400;
      throw error;
    }
    try {
      return await logRepository.add(data);
    } catch (err) {
      if (err.code === "ER_NO_REFERENCED_ROW_2") {
        const error = new Error("Invalid project_id: project does not exist!");
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }
  async getStats(data) {
    return await logRepository.count(data);
  }
  async exportLogs(data) {
    return await logRepository.export(data);
  }
}

module.exports = new LogService();

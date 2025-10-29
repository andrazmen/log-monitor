const connectDB = require("../db/connection");

class LogRepository {
  async findAll(data) {
    try {
      const limit = 10;
      const offset = (data.page - 1) * limit;
      // Logs query
      let logs_query =
        "SELECT logs.id, logs.project_id, logs.timestamp, logs.source, logs.severity, logs.message FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
      // Count query
      let count_query =
        "SELECT COUNT(*) AS count FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
      const params = [data.user_id];

      if (data.project_id) {
        logs_query += " AND logs.project_id = ?";
        count_query += " AND logs.project_id = ?";
        params.push(data.project_id);
      }
      if (data.search) {
        logs_query += " AND (logs.source LIKE ? OR logs.message LIKE ?)";
        count_query += " AND (logs.source LIKE ? OR logs.message LIKE ?)";
        params.push(`%${data.search}%`, `%${data.search}%`);
      }
      if (data.severity && data.severity !== "ALL") {
        logs_query += " AND logs.severity = ?";
        count_query += " AND logs.severity = ?";
        params.push(data.severity);
      }
      if (data.start) {
        logs_query += " AND logs.timestamp >= ?";
        count_query += " AND logs.timestamp >= ?";
        params.push(data.start);
      }
      if (data.end) {
        logs_query += " AND logs.timestamp <= ?";
        count_query += " AND logs.timestamp <= ?";
        params.push(data.end);
      }
      const order = data.sort === "asc" ? "ASC" : "DESC";
      logs_query += ` ORDER BY logs.timestamp ${order} LIMIT ? OFFSET ?`;
      const count_params = [...params];
      params.push(Number(limit), Number(offset));

      const [rows] = await connectDB.query(logs_query, params);
      const [count_rows] = await connectDB.query(count_query, count_params);
      return {
        data: rows,
        pagination: {
          page: data.page,
          limit: limit,
          total: count_rows[0]?.count || 0,
        },
      };
    } catch (err) {
      console.error("Database error in logRepository.findAll:", err);
      throw err;
    }
  }
  async add(data) {
    try {
      const [rows] = await connectDB.query(
        "INSERT INTO logs (project_id, source, timestamp, severity, message) VALUES (?, ?, ?, ?, ?)",
        [
          data.project_id,
          data.source,
          data.timestamp,
          data.severity,
          data.message,
        ]
      );
      return rows;
    } catch (err) {
      console.error("Database error in logRepository.add:", err);
      throw err;
    }
  }
  async count(data) {
    try {
      // time query
      const time_query =
        "SELECT SUM(logs.timestamp >= CONVERT_TZ(NOW(), '+01:00', '+02:00') - INTERVAL 1 HOUR) AS last_hour, SUM(logs.timestamp >= CONVERT_TZ(NOW(), '+01:00', '+02:00') - INTERVAL 24 HOUR) AS last_24_hours FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ? AND project_id = ?";
      // severity query
      const severity_query =
        "SELECT severity, COUNT(*) AS count FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ? AND project_id = ? GROUP BY severity";
      const [time_rows] = await connectDB.query(time_query, [
        data.user_id,
        data.project_id,
      ]);
      const [severity_rows] = await connectDB.query(severity_query, [
        data.user_id,
        data.project_id,
      ]);
      return {
        data: { time: time_rows[0], severity: severity_rows },
      };
    } catch (err) {
      console.error("Database error in logRepository.count:", err);
      throw err;
    }
  }
  async export(data) {
    try {
      let query =
        "SELECT logs.id, logs.project_id, logs.timestamp, logs.source, logs.severity, logs.message FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
      // Count query
      const params = [data.user_id];

      if (data.project_id) {
        query += " AND logs.project_id = ?";
        params.push(data.project_id);
      }
      if (data.search) {
        query += " AND (logs.source LIKE ? OR logs.message LIKE ?)";
        params.push(`%${data.search}%`, `%${data.search}%`);
      }
      if (data.severity && data.severity !== "ALL") {
        query += " AND logs.severity = ?";
        params.push(data.severity);
      }
      if (data.start) {
        query += " AND logs.timestamp >= ?";
        params.push(data.start);
      }
      if (data.end) {
        query += " AND logs.timestamp <= ?";
        params.push(data.end);
      }
      const order = data.sort === "asc" ? "ASC" : "DESC";
      query += ` ORDER BY logs.timestamp ${order}`;

      const [rows] = await connectDB.query(query, params);
      return {
        data: rows,
      };
    } catch (err) {
      console.error("Database error in logRepository.export:", err);
      throw err;
    }
  }
}

module.exports = new LogRepository();

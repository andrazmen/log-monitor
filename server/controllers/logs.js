const connectDB = require("../db/connection").pool;

const getLogs = async (req, res) => {
  console.log(
    "Received get logs request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const user_id = req.user.id;
  const data = {
    project_id: req.params.id,
    search: req.query.search,
    severity: req.query.severity,
    start: req.query.start,
    end: req.query.end,
    sort: req.query.sort || "desc",
    page: req.query.page || 1,
  };
  const limit = 10;
  const offset = (data.page - 1) * limit;
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");

    // Logs query
    let logs_query =
      "SELECT logs.* FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
    // Count query
    let count_query =
      "SELECT COUNT(*) AS count FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
    const params = [user_id];

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

    connection.query(logs_query, params, (err, result) => {
      if (err) {
        console.error("Database error;", err);
        return res.status(500).json({ error: "Server error" });
      }
      connection.query(count_query, count_params, (err, total) => {
        connection.release();
        console.log("Connection released");
        if (err) {
          console.error("Database error;", err);
          return res.status(500).json({ error: "Server error" });
        }
        console.log({
          data: result,
          pagination: {
            page: data.page,
            limit: limit,
            total: total[0]?.count || 0,
          },
        });
        res.status(200).json({
          data: result,
          pagination: {
            page: data.page,
            limit: limit,
            total: total[0]?.count || 0,
          },
        });
      });
    });
  });
};

const addLog = async (req, res) => {
  console.log(
    "Received add log request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const data = {
    project_id: req.params.id,
    source: req.body.source,
    timestamp: req.body.timestamp,
    severity: req.body.severity,
    message: req.body.message,
  };
  if (
    !data.project_id ||
    !data.source ||
    !data.timestamp ||
    !data.severity ||
    !data.message
  ) {
    console.error("ERROR: Bad request: missing required fields");
    return res
      .status(400)
      .json({ error: "Bad request: missing required fields" });
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
    console.error("ERROR: Bad request: invalid severity");
    return res.status(400).json({ error: "Bad request: invalid severity" });
  }
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    connection.query(
      "INSERT INTO logs (project_id, source, timestamp, severity, message) VALUES (?, ?, ?, ?, ?)",
      [
        data.project_id,
        data.source,
        data.timestamp,
        data.severity,
        data.message,
      ],
      (err, result) => {
        connection.release();
        console.log("Connection released");
        if (err) {
          console.error("Database error;", err);
          if (err.code === "ER_NO_REFERENCED_ROW_2") {
            return res
              .status(400)
              .json({ error: "Invalid project_id: project does not exist!" });
          }
          return res.status(500).json({ error: "Server error" });
        }
        console.log("Log added:", result);
        res
          .status(201)
          .json({ message: "Log created successfully", data: data });
      }
    );
  });
};

const getStats = async (req, res) => {
  console.log(
    "Received get stats request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const user_id = req.user.id;
  const project_id = req.params.id;
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    // time query
    const time_query =
      "SELECT SUM(logs.timestamp >= CONVERT_TZ(NOW(), '+01:00', '+02:00') - INTERVAL 1 HOUR) AS last_hour, SUM(logs.timestamp >= CONVERT_TZ(NOW(), '+01:00', '+02:00') - INTERVAL 24 HOUR) AS last_24_hours FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ? AND project_id = ?";
    // severity query
    const severity_query =
      "SELECT severity, COUNT(*) AS count FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ? AND project_id = ? GROUP BY severity";
    connection.query(time_query, [user_id, project_id], (err, time_result) => {
      if (err) {
        console.error("Error fetching time stats:", err);
        return res.status(500).json({ error: "Server error" });
      }
      connection.query(
        severity_query,
        [user_id, project_id],
        (err, severity_result) => {
          connection.release();
          console.log("Connection released");

          if (err) {
            console.error("Error fetching severity stats:", err);
            return res.status(500).json({ error: "Server error" });
          }
          console.log({
            data: { time: time_result[0], severity: severity_result },
          });
          res.status(200).json({
            data: { time: time_result[0], severity: severity_result },
          });
        }
      );
    });
  });
};

const exportLogs = async (req, res) => {
  console.log(
    "Received export logs request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const user_id = req.user.id;
  const data = {
    project_id: req.params.id,
    search: req.query.search,
    severity: req.query.severity,
    start: req.query.start,
    end: req.query.end,
    sort: req.query.sort || "desc",
    page: req.query.page || 1,
  };
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");

    let query =
      "SELECT logs.* FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
    // Count query
    const params = [user_id];

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

    connection.query(query, params, (err, result) => {
      connection.release();
      console.log("Connection released");
      if (err) {
        console.error("Database error;", err);
        return res.status(500).json({ error: "Server error" });
      }
      console.log({
        data: result,
      });
      res.status(200).json({
        data: result,
      });
    });
  });
};

module.exports = { getLogs, addLog, getStats, exportLogs };

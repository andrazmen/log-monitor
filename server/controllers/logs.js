const connectDB = require("../db/connection").pool;

const getLogs = async (req, res) => {
  const user_id = req.user.id;
  const data = {
    project_id: req.query.project_id,
    source: req.query.source,
    timestamp: req.query.timestamp,
    severity: req.query.severity,
    message: req.query.message,
  };
  console.log(data);
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    let baseQuery =
      "SELECT logs.* FROM logs INNER JOIN projects ON logs.project_id = projects.id WHERE projects.created_by = ?";
    const params = [user_id];

    if (data.project_id) {
      baseQuery += " AND logs.project_id = ?";
      params.push(data.project_id);
    }
    if (data.source) {
      baseQuery += " AND logs.source = ?";
      params.push(data.source);
    }
    if (data.timestamp) {
      baseQuery += " AND logs.timestamp = ?";
      params.push(data.timestamp);
    }
    if (data.severity) {
      baseQuery += " AND logs.severity = ?";
      params.push(data.severity);
    }
    if (data.message) {
      baseQuery += " AND logs.message = ?";
      params.push(data.message);
    }
    connection.query(baseQuery, params, (err, result) => {
      connection.release();
      console.log("Connection released");
      if (err) {
        console.error("Database error;", err);
        return res.status(500).json({ error: "Server error" });
      }
      console.log(result);
      res.status(200).json({ data: result });
    });
  });
};

const addLog = async (req, res) => {
  const data = {
    project_id: req.body.project_id,
    source: req.body.source,
    timestamp: req.body.timestamp,
    severity: req.body.severity,
    message: req.body.message,
  };
  console.log(data);

  if (
    !data.project_id ||
    !data.source ||
    !data.timestamp ||
    !data.severity ||
    !data.message
  ) {
    return res.status(400).json("Bad request: missing required fields");
  }
  const allowedSeverities = [
    "EMERG",
    "ALERT",
    "CRIT",
    "ERR",
    "WARNING",
    "NOTICE",
    "INFO",
    "DEBUG",
  ];
  if (!allowedSeverities.includes(data.severity)) {
    return res.status(400).json("Bad request: invalid severity");
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

module.exports = { getLogs, addLog };

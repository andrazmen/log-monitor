const logService = require("../services/logService");

const getLogs = async (req, res) => {
  console.log(
    "Received get logs request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      user_id: req.user.id,
      project_id: req.params.id,
      search: req.query.search,
      severity: req.query.severity,
      start: req.query.start,
      end: req.query.end,
      sort: req.query.sort || "desc",
      page: req.query.page || 1,
    };
    const result = await logService.getLogs(data);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching logs:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

const addLog = async (req, res) => {
  console.log(
    "Received add log request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      project_id: req.params.id,
      source: req.body.source,
      timestamp: req.body.timestamp,
      severity: req.body.severity,
      message: req.body.message,
    };
    const result = await logService.createLog(data);
    console.log("Log added:", result);
    res.status(201).json({ message: "Log created successfully", data: data });
  } catch (err) {
    console.error("Error adding log:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

const getStats = async (req, res) => {
  console.log(
    "Received get stats request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      user_id: req.user.id,
      project_id: req.params.id,
    };
    const result = await logService.getStats(data);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching stats:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

const exportLogs = async (req, res) => {
  console.log(
    "Received export logs request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      user_id: req.user.id,
      project_id: req.params.id,
      search: req.query.search,
      severity: req.query.severity,
      start: req.query.start,
      end: req.query.end,
      sort: req.query.sort || "desc",
      page: req.query.page || 1,
    };
    const result = await logService.exportLogs(data);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error exporting logs:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

module.exports = { getLogs, addLog, getStats, exportLogs };

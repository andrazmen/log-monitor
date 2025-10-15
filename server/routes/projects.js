const express = require("express");
const router = express.Router();

const { getProjects, addProject } = require("../controllers/projects");
const {
  getLogs,
  addLog,
  getStats,
  exportLogs,
} = require("../controllers/logs");

router.get("/", getProjects);
router.post("/", addProject);
router.get("/:id/logs", getLogs);
router.post("/:id/logs", addLog);
router.get("/:id/logs/stats", getStats);
router.get("/:id/logs/export", exportLogs);

module.exports = router;

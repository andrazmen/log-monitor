const express = require("express");
const router = express.Router();

const { getProjects, addProject } = require("../controllers/projects");

router.get("/", getProjects);
router.post("/", addProject);

module.exports = router;

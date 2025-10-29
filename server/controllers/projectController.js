const projectService = require("../services/projectService");

const getProjects = async (req, res) => {
  console.log(
    "Received get projects request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const user_id = req.user.id;
    const result = await projectService.getProjects(user_id);
    console.log({ data: result });
    res.status(200).json({ data: result });
  } catch (err) {
    console.error("Error fetching projects:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

const addProject = async (req, res) => {
  console.log(
    "Received add log request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      name: req.body.name,
      user_id: req.body.user,
      current_user_id: req.user.id,
    };
    await projectService.createProject(data);
    res
      .status(201)
      .json({ message: "Project created successfully", data: data });
  } catch (err) {
    console.error("Error adding project:", err);

    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

module.exports = { getProjects, addProject };

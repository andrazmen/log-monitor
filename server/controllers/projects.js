const connectDB = require("../db/connection").pool;

const getProjects = async (req, res) => {
  console.log(
    "Received get projects request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const user_id = req.user.id;
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    connection.query(
      "SELECT * FROM projects WHERE created_by = ?",
      [user_id],
      (err, result) => {
        connection.release();
        console.log("Connection released");
        if (err) {
          console.error("Database error;", err);
          return res.status(500).json({ error: "Server error" });
        }
        console.log({ data: result });
        res.status(200).json({ data: result });
      }
    );
  });
};

const addProject = async (req, res) => {
  console.log(
    "Received add log request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  const user_id = req.user.id;
  const data = {
    project: req.body.name,
    user_id: req.body.user,
  };
  if (user_id !== data.user_id) {
    console.error(
      "ERROR: Forbidden: you can only create projects for yourself"
    );
    return res
      .status(403)
      .json({ error: "Forbidden: you can only create projects for yourself" });
  }
  if (!data.project || !data.user_id) {
    console.error("ERROR: Bad request: missing required fields");
    return res
      .status(400)
      .json({ error: "Bad request: missing required fields" });
  }

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    connection.query(
      "INSERT INTO projects (name, created_by) VALUES (?, ?)",
      [data.project, data.user_id],
      (err, result) => {
        connection.release();
        console.log("Connection released");
        if (err) {
          console.error("Database error;", err);
          if (err.code === "ER_NO_REFERENCED_ROW_2") {
            return res
              .status(400)
              .json({ error: "Invalid user_id: user does not exist!" });
          }
          return res.status(500).json({ error: "Server error" });
        }
        console.log("Project added:", result);
        res
          .status(201)
          .json({ message: "Project created successfully", data: data });
      }
    );
  });
};

module.exports = { getProjects, addProject };

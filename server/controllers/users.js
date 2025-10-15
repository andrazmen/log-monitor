const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {
  const user_role = req.user.role;
  const data = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  };
  if (user_role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden: only admin can add users" });
  }
  if (!data.username || !data.password) {
    return res.status(400).json("Bad request: missing required fields");
  }
  const salt = await bcrypt.genSalt(10);
  const hashed_pass = await bcrypt.hash(data.password, salt);

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database:", err);
      return res.status(500).json({ error: "Database connection error" });
    }
    console.log("Connection established");
    connection.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [data.username, hashed_pass, data.role],
      (err, result) => {
        connection.release();
        console.log("Connection released");
        if (err) {
          console.error("Database error;", err);
          return res.status(500).json({ error: "Server error" });
        }
        console.log("User added:", result);
        res
          .status(201)
          .json({ message: "User created successfully", data: data });
      }
    );
  });
};

module.exports = addUser;

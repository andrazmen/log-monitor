require("dotenv").config();
const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  if (!data.username || !data.password) {
    return res.status(400).json("Bad request: missing required fields");
  }
  try {
    const output = await new Promise((resolve, reject) => {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "SELECT * FROM users WHERE username = ?",
          [data.username],
          (err, result) => {
            connection.release();
            console.log("Connection released");
            if (err) {
              console.error("Database error;", err);
              return res.status(500).json({ error: "Server error" });
            }
            resolve(result);
          }
        );
      });
    });

    if (output.length === 0) {
      res.status(401).json({ error: "Unauthorized: invalid credentials" });
    }
    console.log("OUTPUT", output.length);
    const match = await bcrypt.compare(data.password, output[0]?.password);
    if (!match) {
      res.status(401).json({ error: "Unauthorized: wrong password" });
    }
    console.log("Passwords match, authenticated");

    const token = jwt.sign(
      {
        user_id: output[0].id,
        username: output[0].username,
        role: output[0].role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
    res.status(200).json({
      data: { user_id: output[0].id, username: output[0].username, token },
    });
  } catch (error) {
    console.error("Error login:", error);
  }
};
module.exports = login;

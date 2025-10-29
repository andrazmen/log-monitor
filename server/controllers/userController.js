const userService = require("../services/userService");

const addUser = async (req, res) => {
  console.log(
    "Received add user request:",
    req.user,
    req.params,
    req.query,
    req.body
  );
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      current_role: req.user.role,
    };
    const result = await userService.createUser(data);
    console.log("User added:", result);
    res
      .status(201)
      .json({
        message: "User created successfully",
        data: { username: data.username, role: data.role },
      });
  } catch (err) {
    console.error("Error adding user:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

module.exports = addUser;

const authService = require("../services/authService");

const login = async (req, res) => {
  console.log(
    "Received login request:",
    req.user,
    req.params,
    req.query,
    req.body
  );

  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    const result = await authService.login(data);
    console.log("Passwords match, authenticated:", result);
    res
      .status(201)
      .json({ message: "Authentication successful", data: result });
  } catch (err) {
    console.error("Error login user:", err);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || "Server error" });
  }
};

module.exports = login;

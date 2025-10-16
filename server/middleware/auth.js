const jwt = require("jsonwebtoken");

// authentication - check received token
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: payload.user_id,
        username: payload.username,
        role: payload.role,
      };
      next();
    } else {
      res.status(401).json({ error: "Unauthorized: authentication invalid" });
    }
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: authentication invalid" });
  }
};

module.exports = auth;

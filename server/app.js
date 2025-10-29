const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
const notFound = (req, res) => res.status(404).send("Route does not exist");

// authentication
const authenticateUser = require("./middleware/auth");

// routes
const login = require("./routes/login");
const users = require("./routes/users");
const projects = require("./routes/projects");

const corsOptions = {
  origin: [process.env.LOCAL_URL, process.env.PUBLIC_URL], // frontend
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/login", login);
app.use("/users", authenticateUser, users);
app.use("/projects", authenticateUser, projects);

app.use(notFound);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port 5000....");
});

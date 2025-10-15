const express = require("express");
const cors = require("cors");

const app = express();

const notFound = (req, res) => res.status(404).send("Route does not exist");

const authenticateUser = require("./middleware/auth");

const login = require("./routes/login");
const users = require("./routes/users");
const projects = require("./routes/projects");
const logs = require("./routes/logs");

app.use(express.json());

const corsOptions = {
  origin: true, // frontend
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.use("/login", login);
app.use("/users", authenticateUser, users);
app.use("/projects", authenticateUser, projects);

app.use(notFound);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

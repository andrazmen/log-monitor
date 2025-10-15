# Log monitor

## Backend

**Tools:**

- Node.js (Express.js), JSON Web Tokens (authentication, authorization)
- MySQL

**APIs:**

- /login (POST): Login
- /users (POST): Adding user (only admin role)
- /projects (GET, POST): Get projects, add project
- /projects/:id/logs (GET): Get logs
- /projects/:id/logs (POST): Add log
- /projects/:id/logs/stats (GET): Get logs statistic
- /projects/:id/logs/export (GET): Get all logs for .xlsx export (not paginated)

## Frontend

**Tools:**

- React + Vite, React Router

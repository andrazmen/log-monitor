# Log monitor

## Backend

**Tools:**

- Node.js (Express.js), JSON Web Tokens (authentication, authorization)
- MySQL

**APIs:**

- /login (POST): Login
- /users (POST): Adding user (only admin role)
- /projects (GET, POST): Get projects, add project
- /projects/:id/logs (GET): Get logs (queries _search, severity, start, end, sort, page_ for filtering)
- /projects/:id/logs (POST): Add log
- /projects/:id/logs/stats (GET): Get logs statistic
- /projects/:id/logs/export (GET): Get all logs for .xlsx export (queries _search, severity, start, end, sort_ for filtering)

## Frontend

**Tools:**

- React + Vite, React Router

## DATABASE

**MySQL Workbench**

1. Add new connection:

- Hostname (from MYSQL_PUBLIC_URL from Railway!)
- Port (from MYSQL_PUBLIC_URL from Railway!)
- User (from MYSQL_PUBLIC_URL from Railway!)
- Password (from MYSQL_PUBLIC_URL from Railway!)

2. Insert dump file (.sql) in railway database (IN WORKBENCH!)

**Railway**

Data is uploaded and database deployed.

## BACKEND

**Railway**

1. Deploy from GitHub repository
2. Set _Root Directory_ on _/server_
3. Set _Public networking_ port on 8080
4. Set _Custom Build Command_ on _npm install_
5. Set *Custom Start Command" on *npm start\*
6. Set _Variables_: _JWT_LIFETIME_, _JWT_SECRET_, _MYSQL_URL_, _MYSQLDATABASE_, _MYSQLHOST_, _MYSQLPASSWORD_, _MYSQLPORT_, MYSQLUSER\*, _LOCAL_URL_, _PUBLIC_URL_

## FRONTEND

**Railway**

1. Deploy from GitHub repository
2. Set _Root Directory_ on _/client_
3. Set _Public networking_ port on 8080
4. Set _Custom Build Command_ on _npm run build_
5. (Set _Variables_: _BASE_URL_ if .env is used)

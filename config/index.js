require("dotenv").config();
const { createPool } = require("mysql");
// Create connection variable
let connection = createPool({ // createPool's fxn allows us to import all files from db - creating database connection
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPwd,
  port: process.env.dbPort,
  database: process.env.dbName,
  multipleStatements: true,
});
module.exports = connection; // exporting the connection db and you can use it in another db

import { createConnection } from "mysql";
import { promisify } from "util";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "../config/config.js";

// Create a connection to the database
const Connection = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
});

// open the MySQL connection
Connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

Connection.query = promisify(Connection.query);

export default Connection;

import mysql from "mysql2";
import dbConfig from "../config/db.config.js";

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

pool.getConnection(function(error, connection) {
  if (error) {
    console.log("Error connecting to database:", error);
  } else {
    console.log("Connected to database!");

    // Exemple de requête pour tester la connexion
    connection.query("SELECT 1", function(err, results) {
      if (err) {
        console.log("Error executing query:", err);
      } else {
        console.log("Query executed successfully:", results);
      }

      connection.release(); // Libérer la connexion après utilisation
    });
  }
});

export default pool 
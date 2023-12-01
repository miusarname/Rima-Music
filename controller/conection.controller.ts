import mysql from "mysql2";
import dotenv from "dotenv";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

dotenv.config();
console.log(process.env.DB_USER,'db')

export const db: Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: " + err.stack);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

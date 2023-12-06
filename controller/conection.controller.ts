import mysql from "mysql2";
import dotenv from "dotenv";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

dotenv.config({path:"../"});
console.log(process.env.DB_USER,'db')

const db: Connection = mysql.createConnection({
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

export const queryAsync = (sql: string, values: Array<any> ) => {
  return new Promise<Array<object>>((resolve, reject) => {
    db.query(sql, values, (err: any, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
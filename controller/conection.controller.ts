import mysql from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const db: Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "RimaMusic",
});

db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.stack);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
  });

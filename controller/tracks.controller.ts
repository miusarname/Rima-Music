import fs from "fs";
import { db } from "./conection.controller.js";

// Promisify the query function
const queryAsync = (sql: string, values: any) => {
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

// Logic
const searchInDb = async (publicId: number) => {
  try {
    const resultados = await queryAsync(
      `SELECT * FROM Canciones WHERE id_public = ${publicId}`,
      []
    );
    return resultados[0];
  } catch (err) {
    console.error("fasho");
    return null;
  }
};

// Router functions
export async function playTrack(req: any | Request, res: any | Response) {
  const idOfTrack: string = req.params.id;
  const realIdOfTrack: any = await searchInDb(Number(idOfTrack));
  const realIdOfTrackId = realIdOfTrack.id_cancion;

  if (!realIdOfTrack) {
    res.status(404).send({ message: "Not found", status: 404 });
  } else {
    const goToTrack: string = "../persistencia/" + idOfTrack +".mp3";
    console.log(goToTrack);

    try {
      console.log('pass1')

      if (!fs.existsSync(goToTrack)) {
        res.status(404).send({ message: "File not found", status: 404 });
        return;
      }
      
      const stat = fs.statSync(goToTrack);
      console.log(stat)

      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": stat.size.toString(),
      });

      const stream = fs.createReadStream(goToTrack);

      stream.on("data", (chunk) => {
        res.write(chunk);
      });

      stream.on("end", () => {
        res.end();
      });

      stream.on("error", (err) => {
        console.error(`Error durante la transmisión: ${err.message}`);
        res.sendStatus(500);
      });
    } catch (error) {
      res.status(500).json({ status: 500 });
    }
  }
}

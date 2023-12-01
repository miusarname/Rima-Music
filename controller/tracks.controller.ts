import fs from "fs";
import { upload } from "./Storage.controller.js";
import { dirname, resolve } from "path";
import { Request, Response } from "express";
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

const addNewTrack = async (content: any) => {
  console.log(content.title);
  try {
    const resultados = await queryAsync(
      "INSERT INTO Canciones (titulo, id_artista, id_album, duracion, id_public, id_genero) VALUES (?, ?, ?, ?, ?, ?)",
      [
        content.title,
        content.artist_id,
        content.album_id,
        content.sec_duration,
        content.gender_id,
        content.artist_id,
      ]
    );
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeTrack  = async (id: number) => {
  try {
    const resultados = await queryAsync("DELETE FROM Canciones WHERE id = ?", [
      id,
    ]);
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateTrackInfo = async (id: number, datos: Record<string, any>): Promise<any> => {
  const claves = Object.keys(datos);
  const valores = Object.values(datos);

  const asignaciones = claves.map((clave) => `${clave} = ?`).join(', ');

  const consulta = `UPDATE Canciones SET ${asignaciones} WHERE id_cancion = ?`;

  const parametros = [...valores, id];

  try {
    const resultados = await queryAsync(consulta, parametros);
    console.log('Fila actualizada correctamente');
    return resultados
  } catch (error) {
    console.error('Error al actualizar la fila:', error);
  }
};


// Router functions
export async function playTrack(req: Request, res: Response): Promise<void> {
  const idOfTrack: string = req.params.id;
  const realIdOfTrack: any = await searchInDb(Number(idOfTrack));
  const realIdOfTrackId = realIdOfTrack.id_cancion;
  const currentDir = dirname("../Streaming-music-app/persistencia/1.mp3");
  if (!realIdOfTrack) {
    res.status(404).send({ message: "Not found", status: 404 });
  } else {
    const goToTrack: string = currentDir + "/" + idOfTrack + ".mp3";
    console.log(goToTrack);

    try {
      if (!fs.existsSync(goToTrack)) {
        res.status(404).send({ message: "File not found", status: 404 });
        return;
      }

      const stat = fs.statSync(goToTrack);
      console.log(stat);

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

export async function uploadTrack(req: Request, res: Response) {
  const resp: any = await addNewTrack(req.body);
  const idToChange: number = resp.insertId + 1;

  // Definir el nombre del archivo
  const nombreArchivo = `${idToChange}.mp3`;

  // Agregar el nombre del archivo a la solicitud (req) si es necesario
  req.body.nombreArchivo = nombreArchivo;
}

export async function DeleteTrack(req:Request, res: Response) {
  let idToDelete: number = req.body.id;
  try {
  var result = await removeTrack(idToDelete);
  } catch (error) {
    console.error(error);
    return null;
  }

  res.status(410).json({status : 410, data : result});
}

export async function updateTrack(req: Request, res: Response) {
  // Obtener el id y eliminarlo del objeto req.body
  let { id, ...trackInfo } = req.body;

  try {
    let result = updateTrackInfo(id, trackInfo);
    res.status(200).json({status : 200, data : result});
  } catch (error: any) {
    console.error(error);

  }
}

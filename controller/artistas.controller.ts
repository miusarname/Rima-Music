import { queryAsync } from "./conection.controller.js";
import { Request, Response } from "express";
import { Artist } from "../Model/Artistis.js";

// logic
const createArtist = async (content: Artist | any): Promise<Object | null> => {
  console.log(content);
  try {
    const result = await queryAsync(
      `INSERT INTO Artistas (nombre) VALUES (?)`,
      [content.nombre]
    );
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

const selectArtists = async (): Promise<Object | null> => {
  try {
    const result = await queryAsync(`SELECT * FROM Artistas`, []);
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const updateArtist = async (
  id: number,
  datos: Record<string, any> | Artist
): Promise<object | null> => {
  const claves = Object.keys(datos);
  const valores = Object.values(datos);

  const asignaciones = claves.map((clave) => `${clave} = ?`).join(", ");

  const consulta = `UPDATE Artistas SET ${asignaciones} WHERE id_artista  = ?`;

  const parametros = [...valores, id];

  try {
    const resultados = await queryAsync(consulta, parametros);
    console.log("Fila actualizada correctamente");
    return resultados;
  } catch (error) {
    console.error("Error al actualizar la fila:", error);
    return null;
  }
};

const deleteArtist = async (id: number): Promise<object | null> => {
  try {
    const resultados = await queryAsync("DELETE FROM Artistas WHERE id = ?", [
      id,
    ]);
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Router functions

export async function getArtists(req: Request, res: Response): Promise<Object> {
  try {
    const Artists = selectArtists();

    res.status(200).json({ status: 200, data: Artists });
    return { status: 200, data: Artists };
  } catch (error) {
    console.error(error);
    return { status: 500, data: error };
  }
}

export async function postArtist(req: Request, res: Response): Promise<Object> {
  try {
    const Artist = req.body;

    const result = await createArtist(Artist);

    res.status(200).json({ status: 200, data: result });
    return { status: 200, data: result };
  } catch (error: any) {
    console.error(error);
    return { status: 500, data: error };
  }
}

export async function putArtist(req: Request, res: Response):Promise<Object> {
  try {
    const { id, ...ArtistInfo } = req.body;

    const result = await updateArtist(id, ArtistInfo);

    res.status(200).json({ status: 200, data: result });

    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: error };
  }
}

export async function deleteArtista(req: Request, res: Response): Promise<Object> {
    try {
        const deleteArtistResult = await deleteArtist(req.body.id);
        res.status(200).json({ status: 200, data: deleteArtist});
        return { status: 200, data: deleteArtistResult};
    } catch (error:any) {
        console.error(error);
        return { status: 500, data: error };
    }
}

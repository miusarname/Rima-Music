// @ts-ignore
import { AlbumT } from "../Model/Album.js"; 
import { queryAsync } from "./conection.controller.js";
import { Request, Response } from "express";

// logic

const selectArtists = async (): Promise<Array<Object> | null> => {
  try {
    const result = await queryAsync(`SELECT * FROM Albumes`, []);
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const createAlbum = async (content: any): Promise<Object | null> => {
  try {
    const result = await queryAsync(
      `INSERT INTO Albumes (nombre, id_artista,anio) VALUES (?, ?, ?)`,
      [content.name, content.artist_id, content.anio]
    );
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const deleteAlbum = async (id: number): Promise<any> => {
  try {
    const resultados = await queryAsync("DELETE FROM Albumes WHERE id = ?", [
      id,
    ]);
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateAlbum = async (
  id: number,
  datos: Record<string, any> | AlbumT
): Promise<object | null> => {
  const claves = Object.keys(datos);
  const valores = Object.values(datos);

  const asignaciones = claves.map((clave) => `${clave} = ?`).join(", ");

  const consulta = `UPDATE Albumes SET ${asignaciones} WHERE id_album   = ?`;

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

const selectAlbum = async (id: number) : Promise<Array<Object> | null> => {
  try {
    const result = await queryAsync(
      `SELECT * FROM Albumes WHERE id_album  = ?`,
      [id]
    );
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};


// Router functions

export async function getAlbum(req: Request, res: Response) : Promise<any> {
    try {
        const resp = await selectArtists();
    res.status(200).json({ status: 200, data: resp });
    return { status: 200, data: resp };
    } catch (error : any) {
        console.log(error)
        res.status(500).json({ status: 500 });
        return { status: 500 };
    }
}

export async function putAlbum(req: Request, res:Response): Promise<any> {
  try {
    const { id, ...AlbumInfo } = req.body;
    const result = await updateAlbum(id, AlbumInfo);
    res.status(200).json({ status: 200, data: result });
    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return { status: 500 };
  }
}

export async function deleteAlbumM(req: Request, res:Response): Promise<any> {
  try {
    const { id } = req.body;
    const result = await deleteAlbum(id);
    res.status(200).json({ status: 200, data: result });
    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return { status: 500 };
  }
}

export async function postAlbum(req: Request, res:Response): Promise<any> {
  try {
    const Album = req.body;
    const result = await createAlbum(Album);
    res.status(200).json({ status: 200, data: result });
    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return { status: 500 };
  }
}

export async function getArtist(req: Request, res:Response): Promise<any> {
  try {
    const { id } = req.body;
    const result = await selectAlbum(id);
    res.status(200).json({ status: 200, data: result });
    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ status: 500 });
    return { status: 500 };
  }
}
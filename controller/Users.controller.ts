import cloudinary from "cloudinary";
import { queryAsync } from "./conection.controller.js";
import { Response,Request } from "express";
import { UserT } from "../Model/User.js";

// logic

const selectUsers =async ():Promise<Object | null> => {
  try {
    const result = await queryAsync(`SELECT * FROM Usuarios`, []);
    return result;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

const createUser =async (content:UserT | any) => {
  try {
    const result = await queryAsync(
      `INSERT INTO Usuarios (nombre,correo_electronico,contraseña,profile_image) VALUES (?, ?, ?, ?)`,
      [content.nombre,content.correo_electronico,content.contraseña,content.profile_image]
    );
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

const changeUser =async (
  id: number,
  datos: Record<string, any>
): Promise<any> => {
  const claves = Object.keys(datos);
  const valores = Object.values(datos);

  const asignaciones = claves.map((clave) => `${clave} = ?`).join(", ");

  const consulta = `UPDATE Usuarios SET ${asignaciones} WHERE id_usuario = ?`;

  const parametros = [...valores, id];

  try {
    const resultados = await queryAsync(consulta, parametros);
    console.log("Fila actualizada correctamente");
    return resultados;
  } catch (error) {
    console.error("Error al actualizar la fila:", error);
  }
};

const removeUser = async (id: number): Promise<any>  => {
  try {
    const resultados = await queryAsync("DELETE FROM Usuarios WHERE id_usuario = ?", [
      id,
    ]);
    return resultados;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const selectUser = async (id: number): Promise<any> => {
  try {
    const result = await queryAsync("SELECT * FROM Usuarios WHERE id_usuario = ?", [id]);
    return result
  } catch (error:any) {
    console.log(error)
    return null
  }
}

// Route handlers
export async function uploadPhoto(req: Request | any, res: Response): Promise<void> {
  // Get the photo data from the request
  const file = req.files.photo; // Assuming the photo is uploaded as a file named "photo"

  // Configure Cloudinary
  // @ts-ignore
  cloudinary.config({ 
    cloud_name: 'dvq3fjinz', 
    api_key: '636613192199762', 
    api_secret: 'NowNpTi_hZmaP7K5BurQvI2ab3I' 
  });

  // Upload the photo to Cloudinary
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      public_id: `photos/${req.body.name}`, // Replace with desired public ID
    });

    // Respond with the uploaded photo information
    res.status(201).json({
      status: 201,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error uploading photo",
    });
  }
}

export async function getAllUser(req:Request, res:Response): Promise<Object | null>{
  try {
    const resp = await selectUsers();
    res.status(200).json({status : 200, data: resp});
    return {status : 200, data: resp}
  } catch (error:any) {
    console.log(error)
    res.status(500).json({status:500})
    return null
  }
}

export async function getUser(req:Request, res:Response): Promise<Object | null>{
  try {
    const resp = await selectUser(req.body.id);
  res.status(200).json({status:200, data: resp});
  return {status : 200, data: resp}
  } catch (error:any) {
    console.log(error)
    res.status(500).json({status:500});
    return null
  }
}

export async function postUser(req:Request, res:Response): Promise<Object | null>{
  try {
    const resp = await createUser(req.body)
    console.log(resp)
    res.status(200).json({status:200, data: resp});
    return {status : 200, data :resp}
  } catch (error:any) {
    console.log(error)
    res.status(500).json({status :500})
    return null
  }
}

export async function deleteUser(req:Request, res:Response): Promise<object | null>{
  try {
    const removeUserResult = await removeUser(req.body.id);
    res.status(200).json({ status: 200, data: removeUserResult });
    return { status: 200, data: removeUserResult };
  } catch (error: any) {
    console.error(error);
    return { status: 500};
  }
}

export async function putUser(req:Request, res:Response): Promise<object | null | void>{
  try {
    const { id, ...ArtistInfo } = req.body;
    console.log(req.body)
    const result = await changeUser(id, ArtistInfo);

    res.status(200).json({ status: 200, data: result });

    return { status: 200, data: result };
  } catch (error: any) {
    console.log(error);
    return { status: 500, data: error };
  }
}
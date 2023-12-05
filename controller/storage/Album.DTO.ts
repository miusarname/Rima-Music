import { Response, Request } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AlbumP, Album } from "../../Model/Album.js";

export var data: object;


export async function validateAlbum(req: Request, res: Response, next: any) {
  try {
    data = plainToClass(Album, req.body, {
      excludeExtraneousValues: true,
    });
    await validate(data);
    req.body = data; // Asignar los datos validados a req.body
    next();
    return data;
  } catch (error) {
    console.error("Error de validación:", error);
    res.status(500).send(JSON.stringify(error));
    return error;
  }
}

export async function validateAlbumput(req: Request, res: Response, next: any) {
  try {
    data = plainToClass(AlbumP, req.body, {
      excludeExtraneousValues: false,
    });
    await validate(data);
    req.body = data; // Asignar los datos validados a req.body
    next();
    return data;
  } catch (error) {
    console.error("Error de validación:", error);
    res.status(500).send(JSON.stringify(error));
    return error;
  }
}

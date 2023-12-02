import { Response, Request } from "express";
import { plainToClass } from "class-transformer";
import { Artists } from "../../Model/Artistis.js";
import { validate } from "class-validator";

export var data: object;

export async function validateArtist(req: Request, res: Response, next: any) {
  try {
    data = plainToClass(Artists, req.body, {
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
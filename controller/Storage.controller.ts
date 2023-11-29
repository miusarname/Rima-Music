import multer, { StorageEngine, Multer } from "multer";
import { Request, Express } from "express";
import path from "path";

export const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request | any, file: Express.Multer.File, cb) => {
    // Directorio donde se guardarán los archivos
    cb(null, "uploads/");
  },
  filename: (req: Request | any, file: Express.Multer.File, cb) => {
    // Nombre del archivo en el servidor
    cb(null, file.fieldname);
  },
});

export const upload: Multer = multer({ storage });

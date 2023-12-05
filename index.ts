import express, { Express, Request, Response } from "express";
import { storage,upload } from "./controller/Storage.controller.js";
import { tracks } from "./controller/routes/tracks.routes.js";
import { artist } from "./controller/routes/artist.routes.js";
import { album } from "./controller/routes/album.routes.js";
import { user } from "./controller/routes/user.routes.js";
import { crearToken,validarToken } from "./controller/helpers/jwt.controller.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/tk',crearToken);
app.use("/tracks",validarToken, tracks);
app.use("/artist", validarToken,artist);
app.use("/album", validarToken,album);
app.use("/user", validarToken,user);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

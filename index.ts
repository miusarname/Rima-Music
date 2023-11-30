import express, { Express, Request, Response } from "express";
import { storage,upload } from "./controller/Storage.controller.js";
import { tracks } from "./controller/routes/tracks.routes.js";
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

app.use("/tracks", tracks);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

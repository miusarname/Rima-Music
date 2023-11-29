import express, { Express, Request, Response } from "express";
import { storage,upload } from "./controller/Storage.controller.js";
import { tracks } from "./controller/routes/tracks.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/tracks", tracks);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

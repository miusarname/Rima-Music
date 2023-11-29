import { Router } from "express";
import { upload } from "../Storage.controller.js";
import { playTrack } from "../tracks.controller.js";

export const tracks: Router = Router();

tracks.get("/play/:id", playTrack);

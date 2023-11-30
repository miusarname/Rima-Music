import { Router } from "express";
import { upload } from "../Storage.controller.js";
import { validateTrack } from "../helpers/tracks.DTO.js";
import { playTrack,uploadTrack } from "../tracks.controller.js";

export const tracks: Router = Router();

tracks.get("/play/:id", playTrack);
tracks.post("/",validateTrack,uploadTrack);
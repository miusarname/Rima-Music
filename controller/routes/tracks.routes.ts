import { Router } from "express";
import { upload } from "../Storage.controller.js";
import { validateTrack,validateTrackput } from "../helpers/tracks.DTO.js";
import { playTrack,uploadTrack,DeleteTrack,updateTrack } from "../tracks.controller.js";

export const tracks: Router = Router();

tracks.get("/play/:id", playTrack);
tracks.post("/",validateTrack,uploadTrack);
tracks.put("/",validateTrackput,updateTrack)
tracks.delete("/",DeleteTrack);
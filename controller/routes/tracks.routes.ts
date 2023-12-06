import { Router } from "express";
import { upload } from "../Storage.controller.js";
import { GetAll,deleteLimiter,post,search } from "../helpers/limiter.controller.js";
import { validateTrack,validateTrackput } from "../storage/tracks.DTO.js";
import { playTrack,uploadTrack,DeleteTrack,updateTrack } from "../tracks.controller.js";

export const tracks: Router = Router();

tracks.get("/play/:id", playTrack);
tracks.post("/",post(),validateTrack,uploadTrack);
tracks.put("/",post(),validateTrackput,updateTrack)
tracks.delete("/",deleteLimiter(),DeleteTrack);
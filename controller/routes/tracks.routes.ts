import { Router } from "express";
import { playTrack } from "../tracks.controller.js";

export const tracks: Router = Router();

tracks.get("/play/:id", playTrack);

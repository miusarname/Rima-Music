import { Router, Request, Response } from "express";
import { deleteArtista,getArtists,postArtist,putArtist } from "../artists.controller.js";
import { validateArtist } from "../helpers/artist.DTO.js";

export const artist: Router = Router();

artist.get("/", getArtists);
artist.post("/",validateArtist, postArtist);
artist.put("/",validateArtist, putArtist);
artist.delete("/", deleteArtista);
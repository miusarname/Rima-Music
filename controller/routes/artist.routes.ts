import { Router } from "express";
import { deleteArtista,getArtists,postArtist,putArtist } from "../artists.controller.js";
import { GetAll,deleteLimiter,limitGrt,post,search  } from "../helpers/limiter.controller.js";
import { validateArtist } from "../storage/artist.DTO.js";

export const artist: Router = Router();

artist.get("/",GetAll(), getArtists);
artist.post("/",post(),validateArtist, postArtist);
artist.put("/",search(),validateArtist, putArtist);
artist.delete("/",deleteLimiter(), deleteArtista);
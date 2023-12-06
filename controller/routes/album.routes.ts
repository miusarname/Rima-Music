import { Router } from "express";
import { limitGrt,GetAll,deleteLimiter,post,search } from "../helpers/limiter.controller.js";
import { deleteAlbumM,getAlbum,getAlbums,postAlbum,putAlbum } from "../album.controller.js";
import { validateAlbum,validateAlbumput } from "../storage/Album.DTO.js";

export const album : Router = Router();

album.get('/',GetAll(),getAlbums);
album.get('/search/',search(),getAlbum);
album.post('/',post(),validateAlbum,postAlbum);
album.put('/',search(),validateAlbumput,putAlbum);
album.delete('/',deleteLimiter(),deleteAlbumM);

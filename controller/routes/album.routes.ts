import { Router } from "express";
import { deleteAlbumM,getAlbum,getAlbums,postAlbum,putAlbum } from "../album.controller.js";
import { validateAlbum,validateAlbumput } from "../storage/Album.DTO.js";

export const album : Router = Router();

album.get('/',getAlbums);
album.get('/search/',getAlbum);
album.post('/',validateAlbum,postAlbum);
album.put('/',validateAlbumput,putAlbum);
album.delete('/',deleteAlbumM);

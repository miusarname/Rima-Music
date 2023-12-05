import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, IsDate, isDefined } from "class-validator";

export interface AlbumT {
    nombre: string;
    id_artista: number;
    anio : number;
  }

export class Album {
  @Expose({ name: "name_album" })
  @IsString()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> name_album",
      };
    },
  })
  nombre: string;

@Expose({ name: "artist_id" })
@IsNumber()
@IsDefined({
  message: () => {
    throw {
      status: 422,
      message: "El parametro es obligatorio -> artist_id",
    };
  },
})
  id_artista: number;



@Expose({ name: "age" })
@IsNumber()
@IsDefined({
  message: () => {
    throw {
      status: 422,
      message: "El parametro es obligatorio -> artist_id",
    };
  },
})
anio : number;

  constructor(
    name_album: string,
    artist_id: number,
    age : number
  ) {
    this.nombre = name_album;
    this.id_artista = artist_id;
    this.anio = age;
    
  }
}

export class AlbumP implements AlbumT {
  @Expose({ name: "name_album" })
  @IsString()
  nombre: string;

@Expose({ name: "artist_id" })
@IsNumber()
  id_artista: number;

@Expose({ name: "age" })
@IsNumber()
anio : number;

  constructor(
    name_album: string,
    artist_id: number,
    age : number
  ) {
    this.nombre = name_album;
    this.id_artista = artist_id;
    this.anio = age;
    
  }
}
import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, IsDate } from "class-validator";

export class Track {
  @Expose({ name: "title" })
  @IsString()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> title",
      };
    },
  })
  titulo: string;

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

  @Expose({ name: "album_id" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> album_id",
      };
    },
  })
  id_album: number;

  @Expose({ name: "sec_duration" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> sec_duration",
      };
    },
  })
  duracion: number;

  @Expose({ name: "gender_id" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> gender_id",
      };
    },
  })
  id_genero: number;

  constructor(
    title: string,
    artist_id: number,
    sec_duration: number,
    album_id: number,
    gender_id: number
  ) {
    this.titulo = title;
    this.id_album = album_id;
    this.duracion = sec_duration;
    this.id_genero = gender_id;
    this.id_artista = artist_id;
  }
}

import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, IsDate } from "class-validator";

export class Track {
  @Expose({ name: "titulo" })
  @IsString()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> titulo",
      };
    },
  })
  title: string;

  @Expose({ name: "id_artista" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> id_artista",
      };
    },
  })
  artist_id: number;

  @Expose({ name: "Id_album" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> Id_album",
      };
    },
  })
  album_id: number;

  @Expose({ name: "seg_duracion" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> seg_duracion",
      };
    },
  })
  sec_duration: number;

  @Expose({ name: "id_genero" })
  @IsNumber()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> id_genero",
      };
    },
  })
  gender_id: number;

  constructor(
    titulo: string,
    id_artista: number,
    seg_duracion: number,
    id_album: number,
    id_genero: number
  ) {
    this.title = titulo;
    this.album_id = id_album;
    this.sec_duration = seg_duracion;
    this.gender_id = id_genero;
    this.artist_id = id_artista;
  }
}

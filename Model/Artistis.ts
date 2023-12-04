import { Expose, Type, Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, IsDate } from "class-validator";

export interface Artist {
  nombre: string;
}

export class Artists {
  @Expose({ name: "name" })
  @IsString()
  @IsDefined({
    message: () => {
      throw {
        status: 422,
        message: "El parametro es obligatorio -> title",
      };
    },
  })
  nombre: string;

  constructor(name: string) {
    this.nombre = name;
  }
}

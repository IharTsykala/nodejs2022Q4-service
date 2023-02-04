import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  grammy: boolean;

  constructor(name, grammy) {
    this.name = name;
    this.grammy = grammy;
  }
}

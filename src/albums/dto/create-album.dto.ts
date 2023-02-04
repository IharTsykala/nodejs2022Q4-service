import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  artistId: string | null; // refers to Artist

  constructor(name, year, artistId) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}

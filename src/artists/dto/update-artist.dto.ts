import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  grammy: boolean;

  // constructor({ name, grammy }) {
  //   this.name = name;
  //   this.grammy = grammy;
  // }
}

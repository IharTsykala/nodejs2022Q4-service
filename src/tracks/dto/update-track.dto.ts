import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  artistId: string | null; // refers to Artist
  @IsNotEmpty()
  albumId: string | null; // refers to Album
  @IsNotEmpty()
  duration: number; // integer number
}

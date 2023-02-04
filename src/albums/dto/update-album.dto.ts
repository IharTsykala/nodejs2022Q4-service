import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  artistId: string | null; // refers to Artist
}

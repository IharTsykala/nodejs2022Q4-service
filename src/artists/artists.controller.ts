import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(
      new CreateArtistDto({ ...createArtistDto }),
    );
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) {
      return;
    }
    return artist;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id) as Artist | undefined;

    if (!artist) {
      return 'error';
    }

    const updatedArtist = this.artistsService.update(artist, updateArtistDto);

    if (!updatedArtist) {
      return 'error';
    }

    return updatedArtist;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }
}

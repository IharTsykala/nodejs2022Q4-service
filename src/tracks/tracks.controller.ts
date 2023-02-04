import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  findOneArtist(id: string) {
    if (!this.artistsService.findOne(id)) {
      throw new NotFoundException();
    }
  }

  findOneAlbum(id: string) {
    if (!this.albumsService.findOne(id)) {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto ?? {};

    this.findOneArtist(artistId);

    this.findOneAlbum(albumId);

    return this.tracksService.create(
      new CreateTrackDto(name, artistId, albumId, duration),
    );
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.findOne(id) as Track | undefined;

    const updatedTrack = this.tracksService.update(track, updateTrackDto);

    if (!updatedTrack) {
      throw new ForbiddenException();
    }

    return updatedTrack;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isRemoved = this.tracksService.remove(id);

    if (!isRemoved) {
      throw new NotFoundException();
    }

    return this.tracksService.remove(id);
  }
}

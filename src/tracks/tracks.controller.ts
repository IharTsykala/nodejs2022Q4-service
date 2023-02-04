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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { validate as uuidValidate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  findOneArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.artistsService.findOne(id);

    // if (!this.artistsService.findOne(id)) {
    //   throw new NotFoundException();
    // }
  }

  findOneAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }
    // if (!this.albumsService.findOne(id)) {
    //   throw new NotFoundException();
    // }

    return this.albumsService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneArtist(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (albumId !== null) {
      const album = this.findOneAlbum(albumId);

      if (!album) {
        throw new NotFoundException();
      }
    }

    // const artist = this.findOneArtist(artistId);
    //
    // const album = this.findOneAlbum(albumId);
    //
    // if (!artist || !album) {
    //   throw new NotFoundException();
    // }

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

    const { artistId, albumId } = updateTrackDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneArtist(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (albumId !== null) {
      const album = this.findOneAlbum(albumId);

      if (!album) {
        throw new NotFoundException();
      }
    }

    // const artist = this.findOneArtist(artistId);
    //
    // const album = this.findOneAlbum(albumId);
    //
    // if (!artist || !album) {
    //   throw new NotFoundException();
    // }

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

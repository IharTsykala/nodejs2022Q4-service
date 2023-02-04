import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { validate as uuidValidate } from 'uuid';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  findOneAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    // const artist = this.artistService.findOne(id);

    // if (!artist) {
    //   throw new NotFoundException();
    // }

    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto ?? {};

    const artist = this.findOneAlbum(artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    return this.albumsService.create(new CreateAlbumDto(name, year, artistId));
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { artistId } = updateAlbumDto ?? {};

    const artist = this.findOneAlbum(artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    const album = this.findOne(id) as Album | undefined;

    const updatedAlbum = this.albumsService.update(album, updateAlbumDto);

    if (!updatedAlbum) {
      throw new ForbiddenException();
    }

    return updatedAlbum;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isRemoved = this.albumsService.remove(id);

    if (!isRemoved) {
      throw new NotFoundException();
    }

    return this.albumsService.remove(id);
  }
}

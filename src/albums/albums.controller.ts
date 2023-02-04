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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto ?? {};

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

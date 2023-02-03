import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id) as Album | undefined;

    if (!album) {
      return 'error';
    }

    const updatedAlbum = this.albumsService.update(album, updateAlbumDto);

    if (!updatedAlbum) {
      return 'error';
    }

    return updatedAlbum;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}

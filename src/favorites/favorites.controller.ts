import { Controller, Post, Param, Delete, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/artists')
  getArtists(@Param('id') id: string) {
    return this.favoritesService.get('artists');
  }

  @Post('/artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favoritesService.add('artists', id);
  }

  @Delete('/artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.remove('artists', id);
  }

  @Get('/albums')
  getAlbums(@Param('id') id: string) {
    return this.favoritesService.get('albums');
  }

  @Post('/album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favoritesService.add('albums', id);
  }

  @Delete('/album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove('albums', id);
  }

  @Get('/tracks')
  getTracks(@Param('id') id: string) {
    return this.favoritesService.get('tracks');
  }

  @Post('/track/:id')
  createTrack(@Param('id') id: string) {
    return this.favoritesService.add('tracks', id);
  }

  @Delete('/track/:id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove('tracks', id);
  }
}

import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    TypeOrmModule.forFeature([Favorite]),
  ],
})
export class FavoritesModule {}

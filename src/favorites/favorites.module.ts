import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
// import  Database  from '../bd';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    // {
    //   provide: 'Database',
    //   useClass: Database,
    // },
  ],
  imports: [ArtistsModule, AlbumsModule, TracksModule],
})
export class FavoritesModule {}

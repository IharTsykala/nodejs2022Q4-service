import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
// import  Database  from '../bd';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    // {
    //   provide: 'Database',
    //   useClass: Database,
    // },
  ],
  imports: [ArtistsModule, AlbumsModule],
  exports: [TracksService],
})
export class TracksModule {}

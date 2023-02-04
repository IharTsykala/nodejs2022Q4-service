import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Database } from '../bd';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
  imports: [ArtistsModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}

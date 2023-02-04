import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Database } from '../bd';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}

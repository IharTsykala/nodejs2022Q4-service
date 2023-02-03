import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { Database } from '../bd';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'Database',
      useClass: Database,
    },
  ],
})
export class TracksModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { Database  from '../bd';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: 'Database',
    //   useClass: Database,
    // },
  ],
})
export class UsersModule {}

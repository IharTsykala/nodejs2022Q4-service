import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService],
})
export class LoggerModule {}

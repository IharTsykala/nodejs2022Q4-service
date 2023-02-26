import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocService } from './doc.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Get()
  findAll(): [] {
    return [];
  }
}

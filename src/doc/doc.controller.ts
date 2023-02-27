import { Controller, Get } from '@nestjs/common';
import { DocService } from './doc.service';

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Get()
  findAll(): [] {
    return [];
  }
}

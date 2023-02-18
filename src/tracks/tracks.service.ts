import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import Database from '../bd';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly storage: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.storage.create(createTrackDto);

    return this.storage.save(createdTrack);
  }

  findAll() {
    return this.storage.find();
  }

  findOne(id: string) {
    return this.storage.findOne({
      where: { id },
    });
  }

  update(track: Track, updateTrackDto: UpdateTrackDto) {
    const createdTrack = this.storage.create({
      ...track,
      ...updateTrackDto,
    });

    return this.storage.save(createdTrack);
  }

  remove(track: Track) {
    return this.storage.delete(track);
  }
}

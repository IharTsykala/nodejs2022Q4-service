import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UpdatePasswordDto } from '../users/dto/update-user.dto';
import { Artist } from '../artists/entities/artist.entity';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateAlbumDto } from '../albums/dto/update-album.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

export class Database {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  create(
    entity: string,
    createDto:
      | CreateUserDto
      | CreateArtistDto
      | CreateAlbumDto
      | CreateTrackDto,
  ): User | Artist {
    const date = Date.now();
    let createdEntity;

    if (createDto instanceof CreateUserDto) {
      createdEntity = {
        id: uuidv4(),
        login: createDto.login,
        password: createDto.password,
        version: 1,
        createdAt: date,
        updatedAt: date,
      } as User;
    }

    if (createDto instanceof CreateArtistDto) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        grammy: createDto.grammy ?? false,
      } as Artist;
    }

    if (createDto instanceof CreateAlbumDto) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        year: createDto.year,
        artistId: createDto.artistId ?? null, // refers to Artist
      } as Album;
    }

    this[entity].push(createdEntity);
    return createdEntity;
  }

  findAll(entity: string): User[] | Artist[] | Album[] | Track[] {
    return this[entity];
  }

  findOne(entity: string, id: string): User | Artist | Album | Track {
    return this[entity].find((entity) => entity.id === id);
  }

  update(
    entity: User | Artist | Album | Track,
    updateEntityDto:
      | UpdatePasswordDto
      | UpdateArtistDto
      | UpdateAlbumDto
      | UpdateTrackDto,
  ) {
    for (const key in updateEntityDto) {
      entity[key] = updateEntityDto[key];
    }
    return entity;
  }

  remove(entity: string, id: string): boolean {
    const indexRemovedEntity = this[entity].findIndex(
      (entity) => entity.id === id,
    );

    if (indexRemovedEntity !== -1) {
      this[entity].splice(indexRemovedEntity, 1);
      return true;
    }

    return false;
  }
}

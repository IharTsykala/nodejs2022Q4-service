import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UpdatePasswordDto } from '../users/dto/update-user.dto';
import { Artist } from '../artists/entities/artist.entity';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';

export class Database {
  users: User[] = [];
  artists: Artist[] = [];

  create(
    entity: string,
    createDto: CreateUserDto | CreateArtistDto,
  ): User | Artist {
    const date = Date.now();
    let createdEntity;

    if (!(createDto instanceof CreateArtistDto)) {
      createdEntity = {
        id: uuidv4(),
        login: createDto.login,
        password: createDto.password,
        version: 1,
        createdAt: date,
        updatedAt: date,
      } as User;
    }

    if (!(createDto instanceof CreateUserDto)) {
      createdEntity = {
        id: uuidv4(),
        name: createDto.name,
        grammy: false,
      } as Artist;
    }

    this[entity].push(createdEntity);
    return createdEntity;
  }

  findAll(entity: string): User[] {
    return this[entity];
  }

  findOne(entity: string, id: string): User | Artist {
    return this[entity].find((entity) => entity.id === id);
  }

  update(
    entity: User | Artist,
    updateEntityDto: UpdatePasswordDto | UpdateArtistDto,
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

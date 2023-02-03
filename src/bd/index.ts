import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UpdatePasswordDto } from '../users/dto/update-user.dto';

export class Database {
  users: User[] = [];

  create(entity: string, createDto: CreateUserDto): User {
    const date = Date.now();

    const user: User = {
      id: uuidv4(),
      login: createDto.login,
      password: createDto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    const entities = {
      users: user,
    };

    this[entity].push(entities[entity]);
    return entities[entity];
  }

  findAll(entity: string): User[] {
    return this[entity];
  }

  findOne(entity: string, id: string): User {
    return this[entity].find((entity) => entity.id === id);
  }

  update(entity: User, updateEntityDto: UpdatePasswordDto) {
    if (
      updateEntityDto.oldPassword &&
      updateEntityDto.oldPassword === entity.password
    ) {
      entity.password = updateEntityDto.newPassword;
      return entity;
    }
  }
}

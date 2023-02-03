import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Database } from '../bd';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('Database') private storage: Database) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create('users', createUserDto);
  }

  findAll() {
    return this.storage.findAll('users');
  }

  findOne(id: string) {
    return this.storage.findOne('users', id);
  }

  update(user: User, updatePasswordDto: UpdatePasswordDto) {
    return this.storage.update(user, updatePasswordDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
// import Database from '../bd';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly storage: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.storage.create(createUserDto);

    // console.log('createdUser', createdUser);

    return this.storage.save(createdUser);
  }

  async findAll() {
    return await this.storage.find();
  }

  async findOne(id: string) {
    return await this.storage.findOne({
      where: { id },
    });
  }

  async update(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    // console.log('user', user);
    if (oldPassword !== user.password) {
      return;
    }

    // console.log('user2', user);

    user.version++;
    user.updatedAt = Math.floor(Date.now() / 1000);

    const updatedUser = await this.storage.create({
      ...user,

      password: newPassword,
    });

    return await this.storage.save(updatedUser);
  }

  async remove(user: User) {
    return await this.storage.delete(user);
  }
}

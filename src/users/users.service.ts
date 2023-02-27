import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
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

    return this.storage.save(createdUser);
  }

  async findAll() {
    return await this.storage.find();
  }

  async findOne(fieldValue: string, fieldName = 'id') {
    return await this.storage.findOne({
      where: { [fieldName]: fieldValue },
    });
  }

  async update(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (oldPassword !== user.password) {
      return;
    }

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

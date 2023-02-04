import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  readonly oldPassword: string; // previous password

  @IsNotEmpty()
  readonly newPassword: string; // new password

  constructor(oldPassword, newPassword) {
    super();
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

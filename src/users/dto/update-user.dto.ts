import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  readonly oldPassword: string; // previous password
  readonly newPassword: string; // new password
}

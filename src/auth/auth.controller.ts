import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto): Promise<User> {
    const { login, password } = body;
    const hashPassword = await this.authService.signUpHash(password);

    return this.usersService.create(new CreateUserDto(login, hashPassword));
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: CreateUserDto): Promise<ITokens> {
    const { login, password } = body;

    const user = await this.usersService.findOne(login, 'login');
    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = this.authService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Data is incorrect');
    }

    return this.authService.getTokens(user.id, login);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Body() body): Promise<ITokens> {
    const { refreshToken } = body;

    const { userId } = this.authService.verifyJWT(refreshToken);

    const user = await this.usersService.findOne(userId, 'id');
    if (!user) {
      throw new NotFoundException();
    }

    const { id, login } = user;

    return this.authService.getTokens(id, login);
  }
}

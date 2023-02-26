import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { accessTokenStrategy } from './strategyes/accessToken.strategy';
import { refreshTokenStrategy } from './strategyes/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    accessTokenStrategy,
    refreshTokenStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
})
export class AuthModule {}

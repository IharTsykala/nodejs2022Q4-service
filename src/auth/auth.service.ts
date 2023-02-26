import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ITokens } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signUpHash(password: string): Promise<string> {
    return await hash(password, parseInt(process.env.CRYPT_SALT));
  }

  async validatePassword(comparedPassword: string, existedPassword: string) {
    return await bcrypt.compare(comparedPassword, existedPassword);
  }

  async getJWT({ userId, login, secret, expiresIn }) {
    return await this.jwtService.signAsync(
      { userId, login },
      { secret, expiresIn },
    );
  }

  async getTokens(userId: string, login: string): Promise<ITokens> {
    const accessToken = await this.getJWT({
      userId,
      login,
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.getJWT({
      userId,
      login,
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  verifyJWT(refreshToken: string) {
    return this.jwtService.verify(refreshToken);
  }
}

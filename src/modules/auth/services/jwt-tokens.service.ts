import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokensService {
  //TODO This authentication is NOT secure for production purposes, it's just a quick demo
  constructor(private jwtService: JwtService) {}

  public async generateTokensPair(profileId: string): Promise<TokensPairType> {
    const secret = process.env.APP_SECRET;
    const accessToken = await this.jwtService.signAsync(
      { profileId },
      {
        expiresIn: '1h',
        secret,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { profileId },
      {
        expiresIn:  "2 days",
        secret,
      },
    );

    return { accessToken, refreshToken };
  }

  async refreshTokensPair(oldRefreshToken: string):Promise<TokensPairType> {
    const refreshTokenData = await this.jwtService.verifyAsync(oldRefreshToken);

    return this.generateTokensPair(refreshTokenData.profileId);
  }
}

export type TokensPairType = {
  refreshToken: string;
  accessToken: string
}

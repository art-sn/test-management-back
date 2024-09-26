import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignupUserCommand } from './use-cases/SignupUser.use-case';
import { SignupInputModel } from './input-models/signup.input-model';
import { LogInInputModel } from './input-models/login.input-model';
import { LoginUserCommand } from './use-cases/LoginUser.use-case';
import { Response, Request } from 'express';
import { JwtTokensService, TokensPairType } from "./services/jwt-tokens.service";
import { AuthGuard } from './auth.guard';

export const cookieOptions = {
  httpOnly: true,
};

@Controller('auth')
export class AuthController {
  public REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

  constructor(
    private commandBus: CommandBus,
    private jwtTokenService: JwtTokensService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    return req['user']
  }

  @Post('signup')
  async signupUser(@Body() body: SignupInputModel) {
    return this.commandBus.execute(new SignupUserCommand(body));
  }

  @Post('login')
  async loginUser(
    @Body() body: LogInInputModel,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.commandBus.execute<LoginUserCommand, TokensPairType>(
      new LoginUserCommand(body),
    );

    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);

    return {
      accessToken,
    };
  }

  @Post('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies[this.REFRESH_TOKEN_COOKIE_NAME];

    const { accessToken, refreshToken } =
      await this.jwtTokenService.refreshTokensPair(oldRefreshToken);

    res.cookie(this.REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);
    return {
      accessToken,
    };
  }
}

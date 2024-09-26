import { CommandHandler } from '@nestjs/cqrs';
import { LogInInputModel } from '../input-models/login.input-model';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { JwtTokensService } from '../services/jwt-tokens.service';

export class LoginUserCommand {
  constructor(public data: LogInInputModel) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserUseCase {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private tokensJwtService: JwtTokensService,
  ) {}

  async execute(cmd: LoginUserCommand) {
    const { data } = cmd;
    const user = await this.userModel
      .findOne({ username: data.username })
      .exec();
    if (!user) {
      //TODO Would be better to decouple business errors from the protocol errors, which needs additional handling
      throw new BadRequestException({
        field: 'username',
        message: 'Invalid username or password',
      });
    }

    const isPasswordCorrect = await compare(data.password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new BadRequestException({
        field: 'username',
        message: 'Invalid username or password',
      });
    }

    // TODO would be better to use jwt auth with refresh token, device and sessions management etc., but in a quick demo I believe this would be enough
    return this.tokensJwtService.generateTokensPair(user._id.toString())
  }
}

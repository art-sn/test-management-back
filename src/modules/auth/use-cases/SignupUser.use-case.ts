import { CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { User } from '../schemas/User.schema';
import { SignupInputModel } from '../input-models/signup.input-model';

export class SignupUserCommand {
  constructor(public data: SignupInputModel) {}
}

@CommandHandler(SignupUserCommand)
export class SignupUserUseCase {
  protected readonly SALT_ROUNDS = 10;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(cmd: SignupUserCommand) {
    const { data } = cmd;

    const userWithInputUsername = await this.userModel
      .findOne({ username: data.username })
      .exec();

    if (userWithInputUsername) {
      // the error should be handled properly in a production application
      throw new Error('User with this username already exists');
    }

    const passwordHash = await hash(data.password, this.SALT_ROUNDS);

    const user = new this.userModel({
      username: data.username,
      passwordHash: passwordHash,
    });

    await user.save();
  }
}

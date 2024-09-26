import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { LoginUserUseCase } from './use-cases/LoginUser.use-case';
import { SignupUserUseCase } from './use-cases/SignupUser.use-case';
import { JwtTokensService } from './services/jwt-tokens.service';
import { CqrsModule } from '@nestjs/cqrs';

const schemas = [{ name: User.name, schema: UserSchema }];
const useCases = [LoginUserUseCase, SignupUserUseCase];
const services = [JwtTokensService];

@Module({
  imports: [MongooseModule.forFeature(schemas), CqrsModule],
  controllers: [AuthController],
  providers: [...useCases, ...services],
})
export class AuthModule {}

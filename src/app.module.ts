import { Module } from '@nestjs/common';
import { PhishingModule } from './modules/phishing/phishing.module';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import * as process from 'process';
import { JwtModule } from '@nestjs/jwt';
import { PhishingSimulationServiceModule } from './infrastructure/phishing-simulation-service/phishing-simulation-service.module';


console.log(process.env.MONGO_URL);
@Module({
  imports: [
    PhishingModule,
    CqrsModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    AuthModule,
    PhishingSimulationServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PhishingController } from './phishing.controller';

@Module({
  controllers: [PhishingController]
})
export class PhishingModule {}

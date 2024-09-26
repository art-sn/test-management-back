import { Global, Module } from '@nestjs/common';
import { PhishingSimulationServiceAdapter } from './phishing-simulation-service.adapter';
import { HttpModule } from '@nestjs/axios';
import * as process from 'process';
import { AxiosHeaders } from 'axios';
require('dotenv').config()

@Global()
@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.PHISHING_SIMULATION_SERVICE_URL,
      headers: {
        'friend-token': process.env.FRIEND_TOKEN,
      },
    }),
  ],
  providers: [PhishingSimulationServiceAdapter],
  exports: [PhishingSimulationServiceAdapter],
})
export class PhishingSimulationServiceModule {}

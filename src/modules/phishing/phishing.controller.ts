import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PhishingSimulationServiceAdapter } from '../../infrastructure/phishing-simulation-service/phishing-simulation-service.adapter';
import { AttemptPhishingInputModel } from './input-models/attempt-phishing.input-model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('phishing')
export class PhishingController {
  constructor(
    private phishingSimulationServiceAdapter: PhishingSimulationServiceAdapter,
  ) {}

  @UseGuards(AuthGuard)
  @Post('send')
  async attemptPhishing(
    @Body() attemptPhishingInputModel: AttemptPhishingInputModel,
  ) {
    await this.phishingSimulationServiceAdapter.sendPhishingEmail(
      attemptPhishingInputModel.email,
    );
  }

  @Get('attempts')
  async getPhishingAttempts() {
    return this.phishingSimulationServiceAdapter.getPhishingAttempts();
  }
}

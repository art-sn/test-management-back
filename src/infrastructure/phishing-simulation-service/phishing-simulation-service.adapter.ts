import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as axios from 'axios';
@Injectable()
export class PhishingSimulationServiceAdapter {

  constructor(private readonly httpService: HttpService) {}

  async sendPhishingEmail(email: string) {
    return this.unwrap(
      this.httpService.axiosRef.post(`${process.env.PHISHING_SIMULATION_SERVICE_URL}/phishing/send`, { email }),
    );
  }

  async getPhishingAttempts() {
    return this.unwrap(this.httpService.axiosRef.get(`${process.env.PHISHING_SIMULATION_SERVICE_URL}/phishing/attempts`))
  }

  private async unwrap<T>(resp: Promise<axios.AxiosResponse<T>>) {
    const { data } = await resp;
    return data;
  }
}

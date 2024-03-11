import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiService } from './api.service';

@Injectable()
export class ScheduledJobService {
  constructor(private readonly apiService: ApiService) {}

  @Cron('*/14 * * * *')
  async fetchDataOnSchedule() {
    try {
      const data = await this.apiService.fetchData();
      console.log('API request successful:', data);
    } catch (error) {
      console.log(error);
    }
  }
}

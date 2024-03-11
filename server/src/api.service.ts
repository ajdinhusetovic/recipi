import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  async fetchData(): Promise<any> {
    const apiUrl = 'https://recipie-api.onrender.com/';

    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }
}

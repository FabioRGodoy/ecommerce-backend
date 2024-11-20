import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly asaasApiUrl = process.env.ASSAS_API_BASE_ADDRESS;
  private readonly asaasApiKey = process.env.ASAAS_API_KEY;

  async createCustomer(customerData: any) {
    const response = await axios.post(
      `${this.asaasApiUrl}/customers`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
          access_token: this.asaasApiKey,
        },
      },
    );
    return response.data;
  }

  async createCharge(chargeData: any) {
    const response = await axios.post(
      `${this.asaasApiUrl}/payments`,
      chargeData,
      {
        headers: {
          'Content-Type': 'application/json',
          access_token: this.asaasApiKey,
        },
      },
    );
    return response.data;
  }

  async handleWebhook(data: any) {
    console.log(data);
    // TODO: lidar com eventos necessarios, e ir alterando status da order no banco
  }
}

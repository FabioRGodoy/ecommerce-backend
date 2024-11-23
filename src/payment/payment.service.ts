import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateChargeDto } from './dto/create-charger.dto';

@Injectable()
export class PaymentService {
  private readonly asaasApiUrl = process.env.ASSAS_API_BASE_ADDRESS;
  private readonly asaasApiKey = process.env.ASAAS_API_KEY;

  async createCustomer(customerData: CreateCustomerDto) {
    try {
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
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao criar o cliente',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCharge(chargeData: CreateChargeDto) {
    try {
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
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao criar o cobrança',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async handleWebhook(data: any) {
    console.log(data);
    // TODO: lidar com eventos necessarios, e ir alterando status da order no banco
  }
}

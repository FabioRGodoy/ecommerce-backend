import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateChargeDto } from './dto/create-charger.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AsaasWebhookDTO } from './entities/payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('customer')
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(@Body() customerData: CreateCustomerDto) {
    return this.paymentService.createCustomer(customerData);
  }

  @Post('charge')
  @HttpCode(HttpStatus.CREATED)
  async createCharge(@Body() chargeData: CreateChargeDto) {
    return this.paymentService.createCharge(chargeData);
  }

  @IsPublic()
  @Post('webhook')
  async handleWebhook(@Body() webhookData: AsaasWebhookDTO) {
    return this.paymentService.handleWebhook(webhookData);
  }
}

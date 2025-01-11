import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateChargeDto } from './dto/create-charger.dto';
import { AsaasWebhookDTO, AsaasWebhookEvent } from './entities/payment.entity';

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

  async handleWebhook(data: AsaasWebhookDTO) {
    const eventHandlers = {
      [AsaasWebhookEvent.PAYMENT_CREATED]: this.handlePaymentCreated,
      [AsaasWebhookEvent.PAYMENT_CONFIRMED]: this.handlePaymentConfirmed,
      [AsaasWebhookEvent.PAYMENT_DELETED]: this.handlePaymentDeleted,
      [AsaasWebhookEvent.PAYMENT_REFUNDED]: this.handlePaymentRefunded,
      [AsaasWebhookEvent.PAYMENT_UPDATED]: this.handlePaymentUpdated,
      [AsaasWebhookEvent.PAYMENT_RECEIVED]: this.handlePaymentReceived,
      [AsaasWebhookEvent.PAYMENT_OVERDUE]: this.handlePaymentOverdue,
    };

    const handler = eventHandlers[data.event];
    if (handler) {
      return handler.call(this, data);
    } else {
      console.warn(`No handler for event: ${data.event}`);
    }
  }

  private async handlePaymentCreated(webhookData: AsaasWebhookDTO) {
    console.log('Payment Created:', webhookData);
    // Exemplo de lógica:
    // 1. Verificar se o pedido associado já existe.
    // 2. Criar um registro de pagamento no banco de dados.
    // 3. Atualizar o status do pedido para "Aguardando Pagamento".
  }

  private async handlePaymentConfirmed(webhookData: AsaasWebhookDTO) {
    console.log('Payment Confirmed:', webhookData);
    // Exemplo de lógica:
    // 1. Atualizar o status do pagamento no banco de dados para "Confirmado".
    // 2. Atualizar o status do pedido para "Processando" ou "Pago".
    // 3. Notificar o usuário sobre a confirmação do pagamento.
  }

  private async handlePaymentDeleted(webhookData: AsaasWebhookDTO) {
    console.log('Payment Deleted:', webhookData);
    // Exemplo de lógica:
    // 1. Atualizar o status do pagamento no banco de dados para "Deletado".
    // 2. Cancelar o pedido associado, se necessário.
    // 3. Notificar o usuário sobre o cancelamento do pagamento.
  }

  private async handlePaymentRefunded(webhookData: AsaasWebhookDTO) {
    console.log('Payment Refunded:', webhookData);
    // Exemplo de lógica:
    // 1. Registrar o reembolso no banco de dados.
    // 2. Atualizar o status do pedido para "Reembolsado".
    // 3. Notificar o usuário sobre o reembolso.
  }

  private async handlePaymentUpdated(webhookData: AsaasWebhookDTO) {
    console.log('Payment Updated:', webhookData);
    // Exemplo de lógica:
    // 1. Verificar quais campos do pagamento foram atualizados.
    // 2. Atualizar o banco de dados com as novas informações.
  }

  private async handlePaymentReceived(webhookData: AsaasWebhookDTO) {
    console.log('Payment Received:', webhookData);
    // Exemplo de lógica:
    // 1. Atualizar o status do pagamento no banco de dados para "Recebido".
    // 2. Atualizar o status do pedido, se necessário.
  }

  private async handlePaymentOverdue(webhookData: AsaasWebhookDTO) {
    console.log('Payment Overdue:', webhookData);
    // Exemplo de lógica:
    // 1. Atualizar o status do pagamento no banco de dados para "Atrasado".
    // 2. Notificar o usuário sobre o atraso no pagamento.
    // 3. Considerar ações adicionais, como aplicar multas ou taxas.
  }
}

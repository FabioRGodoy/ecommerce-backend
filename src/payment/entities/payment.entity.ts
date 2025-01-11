export interface AsaasWebhookDTO {
  id: string;
  event: AsaasWebhookEvent;
  dateCreated: string;
  payment: PaymentDetails;
}

interface PaymentDetails {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  installment: string;
  paymentLink: string | null;
  value: number;
  netValue: number;
  originalValue?: number | null;
  interestValue?: number | null;
  description: string;
  billingType: BillingType;
  confirmedDate?: string | null;
  creditCard: CreditCardDetails;
  pixTransaction?: any | null;
  status: string;
  dueDate: string;
  originalDueDate: string;
  paymentDate?: string | null;
  clientPaymentDate?: string | null;
  installmentNumber: number;
  invoiceUrl: string;
  invoiceNumber: string;
  externalReference?: string | null;
  deleted: boolean;
  anticipated: boolean;
  anticipable: boolean;
  creditDate?: string | null;
  estimatedCreditDate?: string | null;
  transactionReceiptUrl?: string | null;
  nossoNumero?: string | null;
  bankSlipUrl?: string | null;
  lastInvoiceViewedDate?: string | null;
  lastBankSlipViewedDate?: string | null;
  discount: DiscountDetails;
  fine: FineDetails;
  interest: InterestDetails;
  postalService: boolean;
  custody?: any | null;
  refunds?: any | null;
}

interface CreditCardDetails {
  creditCardNumber?: string | null;
  creditCardBrand?: string | null;
  creditCardToken?: string;
}

interface DiscountDetails {
  value: number;
  limitDate?: string | null;
  dueDateLimitDays: number;
  type: string;
}

interface FineDetails {
  value: number;
  type: string;
}

interface InterestDetails {
  value: number;
  type: string;
}

export enum AsaasWebhookEvent {
  PAYMENT_CREATED = 'PAYMENT_CREATED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_DELETED = 'PAYMENT_DELETED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  PAYMENT_UPDATED = 'PAYMENT_UPDATED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
}

enum BillingType {
  CREDIT_CARD = 'CREDIT_CARD',
  BOLETO = 'BOLETO',
  PIX = 'PIX',
}

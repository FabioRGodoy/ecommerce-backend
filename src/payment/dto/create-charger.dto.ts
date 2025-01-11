import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

class DiscountDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

class InterestDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

class FineDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

class CallbackDto {
  @IsOptional()
  @IsString()
  url?: string;
}

export class CreateChargeDto {
  @IsNotEmpty()
  @IsString()
  customer: string;

  @IsNotEmpty()
  @IsString()
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX';

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  daysAfterDueDateToRegistrationCancellation?: number;

  @IsOptional()
  @IsInt()
  installmentCount?: number;

  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @IsOptional()
  @IsNumber()
  installmentValue?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiscountDto)
  discount?: DiscountDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => InterestDto)
  interest?: InterestDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FineDto)
  fine?: FineDto;

  @IsOptional()
  @IsBoolean()
  postalService?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CallbackDto)
  callback?: CallbackDto;
}

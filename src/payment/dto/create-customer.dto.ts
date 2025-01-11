// create-customer.dto.ts
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  addressNumber: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  externalReference?: string;

  @IsOptional()
  @IsBoolean()
  notificationDisabled?: boolean;

  @IsOptional()
  @IsString()
  additionalEmails?: string;

  @IsOptional()
  @IsString()
  municipalInscription?: string;

  @IsOptional()
  @IsString()
  stateInscription?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsString()
  groupName?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsBoolean()
  foreignCustomer?: boolean;
}

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Product } from '../entities/product.entity';
export class UpdateProductDto implements Product {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsNumber()
  @IsPositive()
  stock: number;
}

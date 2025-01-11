import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { Product } from '../entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto implements Product {
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

  @ArrayMinSize(1)
  @IsOptional()
  // @ValidateNested()
  categories: Category[];
}

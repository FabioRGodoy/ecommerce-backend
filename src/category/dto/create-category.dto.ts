import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto implements Category {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto implements Category {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}

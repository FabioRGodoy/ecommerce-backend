import { IsNotEmpty, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}

export class CreateCartDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  items: CreateCartItemDto[];
}

import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  brandId: number;
}

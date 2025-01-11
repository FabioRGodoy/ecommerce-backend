import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BrandController],
  imports: [PrismaModule],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}

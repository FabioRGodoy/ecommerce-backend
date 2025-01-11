import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BrandModule } from 'src/brand/brand.module';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [PrismaModule, BrandModule],
  exports: [ModelsService],
})
export class ModelsModule {}

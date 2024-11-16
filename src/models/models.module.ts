import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [PrismaModule],
  exports: [ModelsService],
})
export class ModelsModule {}
